import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetFarmersList, useGetLastOrderID } from "@/query/Farm.queries";
import { useFormik } from "formik";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import * as yup from "yup";
import { format } from "date-fns";
import type { ComboCheckboxRef } from "@/components/ui/ComboCheckbox";
import ComboCheckbox from "@/components/ui/ComboCheckbox";
import { useAddMoratlityMutations } from "@/query/Mortality.queries";

const mortalitySchema = yup.object().shape({
  farm_id: yup.number().typeError("Farm must be a number").required("Farm is required"),
  incident_date: yup.date().required("Date is required"),
  delivery_id: yup.string().required("Order is required"),
  quantity: yup.number().typeError("Birds must be a number")
    .required("Bird count is required").positive("Must be positive"),
  reason: yup.string().required("Reason is required"),
});

const AddMortality = () => {

  const farmerRef = useRef<ComboCheckboxRef>(null);
  const [openDate, setOpenDate] = useState<boolean>(false);

  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const { data } = useGetFarmersList();
  let addMortalityMutations = useAddMoratlityMutations();

  const mortalityForm = useFormik({
    initialValues: {
      incident_date: new Date(),
      farm_id: null,
      delivery_id: "",
      quantity: 0,
      reason: "",
    },
    validationSchema: mortalitySchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      let payload = {
        ...values,
        incident_date: format(values.incident_date, "yyyy-MM-dd"),
      };
      addMortalityMutations.mutate(payload, {
        onSuccess: () => {
          mortalityForm.resetForm();
        }
      })
    }
  });


  useEffect(() => {
    if (!mortalityForm.isSubmitting) return;
    let firstElement = Object.keys(mortalityForm.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [mortalityForm.errors, mortalityForm.isSubmitting]);


  const { data: lastOrderID } = useGetLastOrderID(Number(mortalityForm.values.farm_id));

  useEffect(() => {
    if (!mortalityForm.values.farm_id) return;

    if (lastOrderID?.order_id) {
      mortalityForm.setFieldValue("delivery_id", String(lastOrderID?.order_id));
    } else {
      mortalityForm.setFieldValue("delivery_id", "");
    }
  }, [lastOrderID, mortalityForm.values.farm_id]);
  useEffect(() => {
    if (!addMortalityMutations.isError) return;
    let err: any = addMortalityMutations.error;
    mortalityForm.setErrors(err?.fieldErrors ?? {});
  }, [addMortalityMutations.isError]);
  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Add Mortality
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Record bird mortality for selected farmer.
            </p>
          </div>
          <Link
            to={"/mortality/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 w-150 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form onSubmit={mortalityForm.handleSubmit} className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">

            {/* FARM */}
            <div className="flex flex-col">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Select Farmer
              </label>

              <ComboCheckbox
                ref={farmerRef}
                label="Farmers"
                items={data?.farms ?? []}
                selectedId={mortalityForm.values.farm_id}
                onSelect={(id) => {
                  mortalityForm.setFieldValue("farm_id", id);
                  mortalityForm.setFieldTouched("farm_id", true);
                }}
              />

              {mortalityForm.touched.farm_id && mortalityForm.errors.farm_id && (
                <span className="text-red-500 text-sm">
                  {mortalityForm.errors.farm_id}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Last Order ID
              </label>

              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4"
                type="text"
                name="delivery_id"
                ref={(el) => {
                  el && (inputRef.current["delivery_id"] = el);
                }}
                onChange={mortalityForm.handleChange}
                onBlur={mortalityForm.handleBlur}
                value={mortalityForm.values.delivery_id || ""}
              />

              {mortalityForm.touched.delivery_id && mortalityForm.errors.delivery_id && (
                <span className="text-red-500 text-sm">
                  {mortalityForm.errors.delivery_id}
                </span>
              )}
            </div>

            {/* DATE */}
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Incident Date
              </label>

              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-none justify-start font-normal bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base`}
                  >
                    {format(mortalityForm.values.incident_date, "dd/MM/yyyy")}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-0 text-base" align="start">
                  <Calendar
                    className="w-75"
                    mode="single"
                    buttonVariant="outline"
                    onSelect={(date) => {
                      if (!date) return;
                      setOpenDate(false);
                      mortalityForm.setFieldValue("incident_date", date);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>



            {/* BIRDS */}
            <div className="flex flex-col">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Number of Birds
              </label>

              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 px-4"
                type="number"
                name="quantity"
                ref={(el) => {
                  el && (inputRef.current["quantity"] = el);
                }}
                onChange={mortalityForm.handleChange}
                onBlur={mortalityForm.handleBlur}
                value={mortalityForm.values.quantity}
              />


              {mortalityForm.touched.quantity && mortalityForm.errors.quantity && (
                <span className="text-red-500 text-sm">
                  {mortalityForm.errors.quantity}
                </span>
              )}
            </div>

            {/* REASON */}
            <div className="flex flex-col">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Reason
              </label>

              <textarea
                className="w-full h-28 resize-none rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2"
                name="reason"
                onChange={mortalityForm.handleChange}
                value={mortalityForm.values.reason}
              />

              {mortalityForm.touched.reason && mortalityForm.errors.reason && (
                <span className="text-red-500 text-sm">
                  {mortalityForm.errors.reason}
                </span>
              )}
            </div>

          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => mortalityForm.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              // spinner={mortalityForm.isPending}
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Save Mortality
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMortality;
