import { Button } from "@/components/ui/button";
import ComboCheckbox from "@/components/ui/ComboCheckbox";
import { useAddMedicineMutation } from "@/query/Medicine.queries";
import { useGetUnitsList } from "@/query/Units.queries";
import type { MedicineFormValues } from "@/types/Medicine";
import { sl } from "date-fns/locale";
import { useFormik } from "formik";
import { ArrowLeftIcon, IndianRupee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";


const addMedicineSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  quantity: yup.number()
    .required("Quantity is required")
    .positive("Quantity must be positive"),
  price_per_unit: yup.number()
    .typeError("Price per unit must be a number")
    .required("Price per unit is required")
    .positive("Price per unit must be positive"),
  unit_id: yup.number().required("Unit is required"),
});
const Add = () => {
  let navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null);

  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const addMedicine = useAddMedicineMutation();
  const { data: units } = useGetUnitsList();



  const medicineForm = useFormik<MedicineFormValues>({
    initialValues: {
      name: "",
      quantity: 0,
      price_per_unit: 0,
      unit_id: 0,
    },
    validationSchema: addMedicineSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      addMedicine.mutate(values, {
        onSuccess: () => {
          addMedicine.isSuccess && medicineForm.resetForm();
          navigate("/medicine/list", { replace: true });
        },
      });
    }
  });
  useEffect(() => {
    setSelectedUnit(units?.find((unit: any) => unit.id === medicineForm.values.unit_id));
  }, [medicineForm.values.unit_id])
  useEffect(() => {
    if (!medicineForm.isSubmitting) return;
    let firstElement = Object.keys(medicineForm.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [medicineForm.errors, medicineForm.isSubmitting]);
  useEffect(() => {
    if (!addMedicine.isError) return;
    let error: any = addMedicine.error;
    medicineForm.setErrors(error.fieldErrors ?? "");
  }, [addMedicine.isError]);

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Add Medicine
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Add new medicine to the system.
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
        <form onSubmit={medicineForm.handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Name
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                type="text"
                name="name"
                ref={(el) => {
                  el && (inputRef.current["name"] = el);
                }}
                onChange={medicineForm.handleChange}
                onBlur={medicineForm.handleBlur}
                value={medicineForm.values.name}
              />
              {medicineForm.touched.name && medicineForm.errors.name ? (
                <span className="text-red-500 text-sm">
                  {medicineForm.errors.name}
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
                selectedId={medicineForm.values.unit_id}
                onSelect={(id) => {
                  medicineForm.setFieldValue("unit_id", id);
                  medicineForm.setFieldTouched("unit_id", true);
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
                onChange={medicineForm.handleChange}
                onBlur={medicineForm.handleBlur}
                value={medicineForm.values.quantity}
              />
              {medicineForm.touched.quantity && medicineForm.errors.quantity ? (
                <span className="text-red-500 text-sm">
                  {medicineForm.errors.quantity}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Price per <span className="text-primary capitalize">{selectedUnit?.short_name}</span>
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="200"
                type="number"
                name="price_per_unit"
                ref={(el) => {
                  el && (inputRef.current["price_per_unit"] = el);
                }}
                onChange={medicineForm.handleChange}
                onBlur={medicineForm.handleBlur}
                value={medicineForm.values.price_per_unit}
              />

              {medicineForm.touched.price_per_unit && medicineForm.errors.price_per_unit ? (
                <span className="text-red-500 text-sm">
                  {medicineForm.errors.price_per_unit}
                </span>
              ) : null}
            </div>

          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => medicineForm.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              spinner={addMedicine.isPending}
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Add Medicine
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Add;
