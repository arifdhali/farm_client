import { Button } from "@/components/ui/button";
import {
  useGetSingleFarm,
  useUpdateFarmerMutation,
} from "@/query/Farm.queries";
import type { CreateFarmer } from "@/types/Farm";
import { useFormik } from "formik";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import * as Yup from "yup";

const editSchema = Yup.object({
  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number must contain only numbers"),
  location: Yup.string().required("Location is required"),
  capacity: Yup.number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number"),
  rate: Yup.number()
    .required("Rate is required")
    .positive("Rate must be a positive number"),
  commission_percentage: Yup.number()
    .min(0, "Commission percentage must be at least 0")
    .max(100, "Commission percentage must be at most 100")
    .required("Commission percentage is required")
    .positive("Commission percentage must be a positive number"),
});

const Edit = () => {
  const { id } = useParams();

  const [FarmsStatus, setFarmsStatus] = useState<"free" | "occupied">("free");

  const inputRef = useRef<
    Record<string, HTMLInputElement | HTMLTextAreaElement | null>
  >({});

  const { data, isLoading } = useGetSingleFarm(Number(id));
  // const { mutate, isPending, isSuccess } =
  // useUpdateFarmerMutation(Number(id));

  const editFarm = useFormik<CreateFarmer>({
    enableReinitialize: true,
    initialValues: {
      name: data?.name ?? "",
      mobile_number: data?.mobile_number ?? "",
      location: data?.location ?? "",
      capacity: data?.capacity ?? 0,
      rate: data?.farmer_rate ?? 0,
      commission_percentage: data?.commission_percentage ?? 0,
    },
    validationSchema: editSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      // mutate({
      //   ...values,
      //   status: FarmsStatus,
      // });
    },
  });

  useEffect(() => {
    if (!editFarm.isSubmitting) return;
    const firstField = Object.keys(editFarm.errors)[0];
    firstField && inputRef.current[firstField]?.focus();
  }, [editFarm.errors, editFarm.isSubmitting]);

  useEffect(() => {
    if (data?.status) {
      setFarmsStatus(data.status);
    }
  }, [data]);

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Edit Farmer
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Update the personal and operational information for this farmer.
            </p>
          </div>
          <Link
            to={"/farms/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form className="p-8" onSubmit={editFarm.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Farmer Name
              </label>
              <input
                disabled
                readOnly
                ref={(el) => {
                  inputRef.current.name = el;
                }}
                name="name"
                value={editFarm.values.name}
                onChange={editFarm.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-200 cursor-not-allowed dark:bg-zinc-800 px-4 py-3"
              />
              {editFarm.errors.name && (
                <span className="text-red-500 text-sm">
                  {editFarm.errors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Mobile Number
              </label>
              <input
                maxLength={10}
                ref={(el) => {
                  inputRef.current.mobile_number = el;
                }}
                name="mobile_number"
                value={editFarm.values.mobile_number}
                onChange={editFarm.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3"
              />
              {editFarm.errors.mobile_number && (
                <span className="text-red-500 text-sm">
                  {editFarm.errors.mobile_number}
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-2">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Farm Address
              </label>
              <textarea
                ref={(el) => {
                  inputRef.current.location = el;
                }}
                name="location"
                value={editFarm.values.location}
                onChange={editFarm.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 min-h-25"
              />
              {editFarm.errors.location && (
                <span className="text-red-500 text-sm">
                  {editFarm.errors.location}
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Farm Capacity
              </label>
              <input
                ref={(el) => {
                  inputRef.current.capacity = el;
                }}
                name="capacity"
                type="number"
                value={editFarm.values.capacity}
                onChange={editFarm.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3"
              />
              {editFarm.errors.capacity && (
                <span className="text-red-500 text-sm">
                  {editFarm.errors.capacity}
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Rate
              </label>
              <input
                ref={(el) => {
                  inputRef.current.rate = el;
                }}
                name="rate"
                type="number"
                value={editFarm.values.rate}
                onChange={editFarm.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3"
              />
              {editFarm.errors.rate && (
                <span className="text-red-500 text-sm">
                  {editFarm.errors.rate}
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                Commision Percentage (%)
              </label>
              <input
                ref={(el) => {
                  inputRef.current.commission_percentage = el;
                }}
                name="commission_percentage"
                type="number"
                value={editFarm.values.commission_percentage}
                onChange={editFarm.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3"
              />
              {editFarm.errors.commission_percentage && (
                <span className="text-red-500 text-sm">
                  {editFarm.errors.commission_percentage}
                </span>
              )}
            </div>
          </div>

          <div className="mt-10">
            <Button
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
