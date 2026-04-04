import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetFarmersList, useGetLastOrderID } from "@/query/Farm.queries";
import { useFormik } from "formik";
import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import * as yup from "yup";
import { format } from "date-fns";
import { useGetMedicineListQuery, useMedicineDeliveryMutation } from "@/query/Medicine.queries";
import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import type { MedicineDeliveryFormValues } from "@/types/Medicine";
import useDebounce from "@/hooks/useDebounce";
import ComboCheckbox from "@/components/ui/ComboCheckbox";
import { useGetUnitsList } from "@/query/Units.queries";


const medicineDeliverySchema = yup.object().shape({
  delivery_date: yup.date().required("Delivery date is required").min(
    new Date(new Date().setHours(0, 0, 0, 0)),
    "Delivery date cannot be in the past"
  ),
  farm_id: yup.number().typeError("Farm must be a number").required("Farm is required"),
  order_id: yup.string().required("Order is required"),
  medicine_id: yup.number().typeError("Medicine must be a number").required("Medicine is required"),
  quantity: yup.number().typeError("Quantity must be a number")
    .required("Quantity is required").positive("Quantity must be a positive number"),
  unit_id: yup.number().required("Unit is required"),

});
const Delivery = () => {
  const [search, setSearch] = useState("");
  let deboundSearched = useDebounce(search, 400);

  const { data: units } = useGetUnitsList();

  const medicineRef = useRef<ComboCheckboxRef>(null);
  const farmerRef = useRef<ComboCheckboxRef>(null);
  const [openDate, setOpenDate] = useState<boolean>(false);

  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const { data } = useGetFarmersList({ search: deboundSearched });
  const makeDelivery = useMedicineDeliveryMutation();
  const deliveryForm = useFormik<MedicineDeliveryFormValues>({
    initialValues: {
      delivery_date: new Date(),
      order_id: "",
      medicine_id: null,
      farm_id: null,
      quantity: 0,
      unit_id: null,
    },
    validationSchema: medicineDeliverySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      let payload = {
        ...values,
        delivery_date: format(values.delivery_date, "yyyy-MM-dd"),
      }
      console.log(payload)
      // makeDelivery.mutate(payload, {
      //   onSuccess: (data) => {
      //     deliveryForm.resetForm();

      //   },
      // });

    }
  });

  
  useEffect(() => {
    if (!deliveryForm.isSubmitting) return;
    let firstElement = Object.keys(deliveryForm.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [deliveryForm.errors, deliveryForm.isSubmitting]);

  const { data: lastOrderID } = useGetLastOrderID(Number(deliveryForm.values.farm_id));
  const { data: medicine } = useGetMedicineListQuery();
  useEffect(() => {
    if (!deliveryForm.values.farm_id) return;

    if (lastOrderID?.order_id) {
      deliveryForm.setFieldValue("order_id", String(lastOrderID.order_id));
    } else {
      deliveryForm.setFieldValue("order_id", null);

    }
  }, [lastOrderID, deliveryForm.values.farm_id]);

  useEffect(() => {
    if (!makeDelivery.isError) return;
    const error: any = makeDelivery.error;
    deliveryForm.setErrors(error.fieldErrors ?? "");
  }, [makeDelivery.isError])


  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Send to Farmer
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Send to a farmer and their livestock capacity to the system.
            </p>
          </div>
          <Link
            to={"/medicine/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 w-150 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form onSubmit={deliveryForm.handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Medicine
              </label>
              <ComboCheckbox
                ref={medicineRef}
                label="Medicine"
                items={medicine?.medicines ?? []}
                selectedId={deliveryForm.values.medicine_id}
                onSelect={(id) => {
                  deliveryForm.setFieldValue("medicine_id", id);
                  deliveryForm.setFieldTouched("medicine_id", true);
                  farmerRef.current?.open();
                }}
              />
              {deliveryForm.touched.medicine_id && deliveryForm.errors.medicine_id ? (
                <span className="text-red-500 text-sm">
                  {deliveryForm.errors.medicine_id}
                </span>
              ) : null}

            </div>


            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Farmer
              </label>

              <ComboCheckbox
                ref={farmerRef}
                label="Farmers"
                items={data?.farms ?? []}
                selectedId={deliveryForm.values.farm_id}
                onSearch={(value) => setSearch(value)}
                onSelect={(id) => {
                  deliveryForm.setFieldValue("farm_id", id);
                  deliveryForm.setFieldTouched("farm_id", true);
                }}
              />

              {deliveryForm.touched.farm_id && deliveryForm.errors.farm_id ? (
                <span className="text-red-500 text-sm">
                  {deliveryForm.errors.farm_id}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Last Order ID <span className="text-xs font-normal text-gray-600">(This is last chicks delivery id)</span>
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                type="text"
                name="order_id"
                ref={(el) => {
                  el && (inputRef.current["order_id"] = el);
                }}
                onChange={deliveryForm.handleChange}
                onBlur={deliveryForm.handleBlur}
                value={deliveryForm.values.order_id || ""}
              />

              {deliveryForm.touched.order_id && deliveryForm.errors.order_id ? (
                <span className="text-red-500 text-sm">
                  {deliveryForm.errors.order_id}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Date
              </label>

              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-none justify-start font-normal bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base`}
                  >
                    {deliveryForm.values.delivery_date
                      ? format(deliveryForm.values.delivery_date, "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger >
                <PopoverContent className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-0 text-base" align="start">
                  <Calendar
                    className="w-75"
                    mode="single"
                    buttonVariant="outline"
                    disabled={{ before: new Date() }}
                    onSelect={(date) => {
                      if (!date) return;
                      setOpenDate(false);
                      deliveryForm.setFieldValue("delivery_date", date)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {deliveryForm.touched.delivery_date && deliveryForm.errors.delivery_date ? (
                <span className="text-red-500 text-sm">
                  {deliveryForm.errors.delivery_date}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Choose Unit
              </label>
              <ComboCheckbox
                className="capitalize"
                label="units"
                items={units ?? []}
                selectedId={deliveryForm.values.unit_id}
                onSelect={(id) => {
                  deliveryForm.setFieldValue("unit_id", id);
                  deliveryForm.setFieldTouched("unit_id", true);
                }}
              />
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Quantity
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="200"
                type="number"
                name="quantity"
                ref={(el) => {
                  el && (inputRef.current["quantity"] = el);
                }}
                onChange={deliveryForm.handleChange}
                onBlur={deliveryForm.handleBlur}
                value={deliveryForm.values.quantity}
              />
              {deliveryForm.touched.quantity && deliveryForm.errors.quantity ? (
                <span className="text-red-500 text-sm">
                  {deliveryForm.errors.quantity}
                </span>
              ) : null}
            </div>


          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => deliveryForm.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              spinner={makeDelivery.isPending}
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Make Delivery
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Delivery;



type ComboCheckboxRef = {
  open: () => void;
  close: () => void;
};

type ComboCheckboxProps = {
  label: string;
  items: any[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

// const ComboCheckbox = forwardRef<ComboCheckboxRef, ComboCheckboxProps>(({ label, items, selectedId, onSelect }, ref) => {
//   const [open, setOpen] = useState(false);

//   const selectedItem = items.find(
//     (i) => Number(i.id) === selectedId
//   );


//   useImperativeHandle(ref, () => ({
//     open: () => setOpen(true),
//     close: () => setOpen(false),
//   }));

//   return (

//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-full border-slate-200 h-12 justify-between bg-white shadow-none font-normal text-sm"
//         >
//           {selectedItem ? selectedItem.name : `Select ${label}...`}
//           <ChevronsUpDown />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="p-0 border border-slate-200" align="start">
//         <Command className="border-0">
//           <CommandInput placeholder={`Search ${label}...`} className="border-0" />
//           <CommandList>
//             <CommandEmpty>No data found.</CommandEmpty>
//             <CommandGroup>
//               {items.map((item: any) => (
//                 <CommandItem
//                   key={item.id}
//                   value={String(item.id)}
//                   onSelect={() => {
//                     onSelect(Number(item.id));
//                     setOpen(false);
//                   }}
//                 >
//                   {item.name}
//                   <Check
//                     className={cn(
//                       "ml-auto",
//                       selectedId === Number(item.id)
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>

//   );
// });


