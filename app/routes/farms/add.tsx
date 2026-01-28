import { Button } from "@/components/ui/button";
import { useCreateFarmerMutation } from "@/query/Farm.queries";
import { useFormik } from "formik";
import { ArrowLeftIcon, ArrowLeftToLineIcon } from "lucide-react";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import * as Yup from "yup";

const addSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  mobile_number: Yup.string().required("Mobile number is required"),
  location: Yup.string().required("Location is required"),
  capacity: Yup.number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number"),
  farm_status: Yup.string().required("Farm status is required"),
  farmer_rate: Yup.number()
    .required("Farmer rate is required")
    .positive("Farmer rate must be a positive number"),
  commision_rate: Yup.number()
    .required("Commission rate is required")
    .positive("Commission rate must be a positive number"),
});

const Add = () => {
  const [FarmsStatus, setFarmsStatus] = useState<"free" | "occupied">("free");
  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const { mutate, isPending } = useCreateFarmerMutation();

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  const addFarm = useFormik({
    initialValues: {
      name: "",
      mobile_number: "",
      location: "",
      capacity: 0,
      farm_status: FarmsStatus,
      farmer_rate: 0,
      commision_rate: 0,
    },
    validationSchema: addSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!addFarm.isSubmitting) return;
    let firstElement = Object.keys(addFarm.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();

  }, [addFarm.errors, addFarm.isSubmitting]);

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Add New Farmer
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Register a new farmer and their livestock capacity to the system.
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
        <form className="p-8" onSubmit={addFarm.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farmer Name
              </label>
              <input
                ref={(el) => {
                  el && (inputRef.current["name"] = el);
                }}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter full name"
                type="text"
                name="name"
                value={addFarm.values.name}
                onChange={addFarm.handleChange}
              />
              {addFarm.touched.name && addFarm.errors.name ? (
                <span className="text-red-500 text-sm">
                  {addFarm.errors.name}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Mobile Number
              </label>
              <input
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="+1 234 567 890"
                type="tel"
                name="mobile_number"
                value={addFarm.values.mobile_number}
                onChange={addFarm.handleChange}
              />
              {addFarm.touched.mobile_number && addFarm.errors.mobile_number ? (
                <span className="text-red-500 text-sm">
                  {addFarm.errors.mobile_number}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farm Address
              </label>
              <textarea
                ref={(el) => {
                  el && (inputRef.current["location"] = el);
                }}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base min-h-25"
                placeholder="Enter physical farm address"
                name="location"
                value={addFarm.values.location}
                onChange={addFarm.handleChange}
              ></textarea>
              {addFarm.touched.location && addFarm.errors.location ? (
                <span className="text-red-500 text-sm">
                  {addFarm.errors.location}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farm Capacity
              </label>
              <input
                name="capacity"
                value={addFarm.values.capacity}
                onChange={addFarm.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="e.g. 5000 birds"
                type="number"
              />
              {
                addFarm.touched.capacity && addFarm.errors.capacity ? (
                  <span className="text-red-500 text-sm">
                    {addFarm.errors.capacity}
                  </span>
                ) : null
              }
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farm Status
              </label>
              <div className="relative flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg w-full max-w-xs">
                {/* Sliding Active Indicator */}
                <span
                  className={`absolute top-1 left-1 h-[calc(100%-0.5rem)] w-1/2 rounded-md bg-white dark:bg-zinc-700 shadow-sm border border-zinc-200 dark:border-zinc-600 transition-transform duration-300 ease-in-out
          ${FarmsStatus === "occupied" ? "translate-x-full" : ""}`}
                />

                {/* Free */}
                <button
                  type="button"
                  onClick={() => setFarmsStatus("free")}
                  className={`relative z-10 flex-1 py-2 text-sm font-bold transition-colors
            ${FarmsStatus === "free"
                      ? "text-primary"
                      : "text-zinc-500 dark:text-zinc-400"
                    }`}
                >
                  Free
                </button>

                {/* Occupied */}
                <button
                  type="button"
                  onClick={() => setFarmsStatus("occupied")}
                  className={`relative z-10 flex-1 py-2 text-sm font-bold transition-colors
            ${FarmsStatus === "occupied"
                      ? "text-primary"
                      : "text-zinc-500 dark:text-zinc-400"
                    }`}
                >
                  Occupied
                </button>
              </div>
            </div>
            <div className="col-span-1 ">
              <div className="flex justify-between gap-x-8">
                <div className="flex flex-col w-1/2 ">
                  <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                    Farmer Rate
                  </label>
                  <input
                    name="farmer_rate"
                    value={addFarm.values.farmer_rate}
                    onChange={addFarm.handleChange}
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                    placeholder="Fixed price"
                    type="number"
                  />
                  {
                    addFarm.touched.farmer_rate && addFarm.errors.farmer_rate ? (
                      <span className="text-red-500 text-sm">
                        {addFarm.errors.farmer_rate}
                      </span>
                    ) : null
                  }
                </div>
                <div className="flex flex-col w-1/2 ">
                  <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                    Commision Percentage (%)
                  </label>
                  <input
                    name="commision_rate"
                    value={addFarm.values.commision_rate}
                    onChange={addFarm.handleChange}
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                    placeholder="10.2%"
                    type="number"
                  />
                  {
                    addFarm.touched.commision_rate && addFarm.errors.commision_rate ? (
                      <span className="text-red-500 text-sm">
                        {addFarm.errors.commision_rate}
                      </span>
                    ) : null
                  }

                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              spinner={isPending}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Add Farmer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
