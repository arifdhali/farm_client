import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetFarmersList } from "@/query/Farm.queries";
import type { DeliveryFormValues } from "@/types/Chicks";
import { useFormik } from "formik";
import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import * as yup from "yup";
import { format } from "date-fns";
import { useChickDeliveryMutation } from "@/query/Chicks.queries";

const chicksDeliverySchema = yup.object().shape({
  delivery_date: yup.date().required("Delivery date is required").min(
    new Date(new Date().setHours(0, 0, 0, 0)),
    "Delivery date cannot be in the past"
  ),
  farm_id: yup.number().typeError("Farm must be a number").required("Farm is required"),
  quantity: yup.number().typeError("Quantity must be a number")
    .required("Quantity is required").positive("Quantity must be a positive number"),
  chicks_rate: yup.number().typeError("Chicks rate must be a number")
    .required("Chicks rate is required").positive("Chicks must be a positive number"),

});
const Delivery = () => {
  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const [open, setOpen] = useState<any>({
    select_farmer: false,
    select_date: false,
  });

  const { data } = useGetFarmersList();
  const makeDelivery = useChickDeliveryMutation();

  const devliveryForm = useFormik<DeliveryFormValues>({
    initialValues: {
      delivery_date: new Date(),
      farm_id: null,
      quantity: 0,
      chicks_rate: 0,
    },
    validationSchema: chicksDeliverySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      let payload = {
        ...values,
        delivery_date: format(values.delivery_date, "yyyy-MM-dd"),
      }
      makeDelivery.mutate(payload);
      if (makeDelivery.isSuccess) {
        devliveryForm.resetForm();
      }
    }
  });

  const selectedFarm = data?.data?.farms.find((farm: any) => Number(farm.id) == devliveryForm.values.farm_id);
  useEffect(() => {
    if (!devliveryForm.isSubmitting) return;
    let firstElement = Object.keys(devliveryForm.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [devliveryForm.errors, devliveryForm.isSubmitting]);

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
            to={"/chicks/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 w-150 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form onSubmit={devliveryForm.handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farmer Name
              </label>
              <Popover open={open.select_farmer} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open.select_farmer}
                    className="w-full border-slate-200 h-12 justify-between bg-white shadow-none"
                  >
                    {devliveryForm.values.farm_id
                      ? selectedFarm?.name
                      : "Select farm..."}
                    <ChevronsUpDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-0 border border-slate-200" align="start">
                  <Command className="border-0">
                    <CommandInput placeholder="Search farm..." className="border-0" />
                    <CommandList>
                      <CommandEmpty>No farm found.</CommandEmpty>
                      <CommandGroup>
                        {data?.data?.farms.length > 0 && (
                          data?.data?.farms.map((farm: any) => (
                            <CommandItem
                              key={String(farm.id)}
                              value={String(farm.id)}
                              onSelect={(currentValue) => {
                                devliveryForm.setFieldValue("farm_id", currentValue)
                                setOpen({
                                  select_farmer: false
                                })
                              }}
                            >
                              {farm.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  devliveryForm.values.farm_id === Number(farm.id) ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {devliveryForm.touched.farm_id && devliveryForm.errors.farm_id ? (
                <span className="text-red-500 text-sm">
                  {devliveryForm.errors.farm_id}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Date
              </label>

              <Popover open={open.select_date} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-none justify-start font-normal bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base`}
                  >
                    {devliveryForm.values.delivery_date
                      ? format(devliveryForm.values.delivery_date, "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger >
                <PopoverContent className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-0 text-base" align="start">
                  <Calendar
                    className="w-75"
                    mode="single"
                    buttonVariant="outline"
                    selected={devliveryForm.values.delivery_date}
                    disabled={{ before: new Date() }}
                    onSelect={(date) => {
                      if (!date) return;
                      setOpen({
                        select_date: false
                      })
                      devliveryForm.setFieldValue("delivery_date", date)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {devliveryForm.touched.delivery_date && devliveryForm.errors.delivery_date ? (
                <span className="text-red-500 text-sm">
                  {devliveryForm.errors.delivery_date}
                </span>
              ) : null}
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
                onChange={devliveryForm.handleChange}
                onBlur={devliveryForm.handleBlur}
                value={devliveryForm.values.quantity}
              />
              {devliveryForm.touched.quantity && devliveryForm.errors.quantity ? (
                <span className="text-red-500 text-sm">
                  {devliveryForm.errors.quantity}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Chicks Rate
              </label>
              <input

                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Fixed price"
                type="number"
                name="chicks_rate"
                ref={(el) => {
                  el && (inputRef.current["chicks_rate"] = el);
                }}
                onChange={devliveryForm.handleChange}
                onBlur={devliveryForm.handleBlur}
                value={devliveryForm.values.chicks_rate}
              />
              {devliveryForm.touched.chicks_rate && devliveryForm.errors.chicks_rate ? (
                <span className="text-red-500 text-sm">
                  {devliveryForm.errors.chicks_rate}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => devliveryForm.resetForm()}
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
