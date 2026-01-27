import { useCreateFarmerMutation } from "@/query/Farm.queries";
import { ArrowLeftIcon, ArrowLeftToLineIcon } from "lucide-react";
import React, { useState, type FormEvent } from "react";
import { Link } from "react-router";

const Add = () => {
  const [FarmsStatus, setFarmsStatus] = useState<"free" | "occupied">("free");

  const { mutate, isPending } = useCreateFarmerMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      name: "1 Ramesh Kumar",
      mobile_number: "9176513210",
      location: "Village Road, Andhra Pradesh",
      capacity: 5000
    })
  }


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
        <form className="p-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farmer Name
              </label>
              <input
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter full name"
                type="text"
              />
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Mobile Number
              </label>
              <input
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="+1 234 567 890"
                type="tel"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farm Address
              </label>
              <textarea
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base min-h-25"
                placeholder="Enter physical farm address"
              ></textarea>
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farm Capacity
              </label>
              <input
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="e.g. 5000 birds"
                type="text"
              />
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
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                    placeholder="Fixed price"
                    type="number"
                  />
                </div>
                <div className="flex flex-col w-1/2 ">
                  <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                    Commision Percentage (%)
                  </label>
                  <input
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                    placeholder="10.2%"
                    type="number"
                  />
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
            <button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Add Farmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
