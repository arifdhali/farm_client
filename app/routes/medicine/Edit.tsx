import { Button } from "@/components/ui/button";
import {
    useGetSingleMedicine,
    useUpdateMedicineMutation,
} from "@/query/Medicine.queries";
import type { MedicineFormValues } from "@/types/Medicine";
import { useFormik } from "formik";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import * as yup from "yup";

const editMedicineSchema = yup.object().shape({
    stock: yup
        .number()
        .typeError("Stock must be a number")
        .required("Stock is required")
        .positive("Stock must be a positive number"),
});
const Edit = () => {
    const { id } = useParams();
    const { data: singleMedicine } = useGetSingleMedicine(Number(id));

    const updateMedicine = useUpdateMedicineMutation();
    const medicineForm = useFormik<any>({
        enableReinitialize: true,
        initialValues: {
            stock: singleMedicine?.stock ?? 0,
            price_per_unit: singleMedicine?.price_per_unit ?? 0,
        },
        validationSchema: editMedicineSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            updateMedicine.mutate({ updateData: values, id: Number(id) });

        },
    });

    useEffect(() => {
        if (!updateMedicine.isError) return;
        let error: any = updateMedicine.error;
        medicineForm.setErrors(error.fieldErrors ?? "");
    }, [updateMedicine.isError]);

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-end gap-3">
                    <div className="flex flex-col ">
                        <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
                            Update Medicine
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
                            Update medicine details.
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
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-200 cursor-not-allowed dark:bg-zinc-800 px-4 py-3"
                                placeholder="example medicine"
                                type="text"
                                name="name"
                                value={singleMedicine?.name ?? ""}
                            />
                        </div>

                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                                Stock
                            </label>
                            <input
                                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                placeholder="200"
                                type="text"
                                name="stock"
                                onChange={medicineForm.handleChange}
                                onBlur={medicineForm.handleBlur}
                                value={medicineForm.values.stock}
                            />
                            {medicineForm.touched.stock && medicineForm.errors.stock ? (
                                <span className="text-red-500 text-sm">
                                    {medicineForm.errors.stock}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                                Price per <span className="text-primary">
                                    {singleMedicine?.unit_short_name}
                                </span>
                            </label>
                            <input
                                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                type="text"
                                onChange={medicineForm.handleChange}
                                onBlur={medicineForm.handleBlur}
                                name="price_per_unit"
                                value={medicineForm.values.price_per_unit}
                            />
                            <span className="text-xs mt-1 text-gray-700">Per {singleMedicine?.unit_name} price</span>

                            {medicineForm.touched.price_per_unit && medicineForm.errors.price_per_unit ? (
                                <span className="text-red-500 text-sm">
                                    {medicineForm.errors.price_per_unit}
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-10">

                        <Button
                            spinner={updateMedicine.isPending}
                            className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
                            type="submit"
                        >
                            Update Medicine
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
