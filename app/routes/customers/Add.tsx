import { Button } from "@/components/ui/button";
import { useAddCustomerMutation } from "@/query/Customers.queries";
import { useCreateFarmerMutation } from "@/query/Farm.queries";
import type { CreateCustomer } from "@/types/Customers.type";
import { useFormik } from "formik";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import * as Yup from "yup";

const addSchema = Yup.object({
  name: Yup.string(),
  shopname: Yup.string().required("Shop name is required"),
  email: Yup.string().email("Invalid email address"),
  phone: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number must contain only numbers"),
  address: Yup.string(),
});

const Add = () => {

  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const { mutate, isPending, isSuccess, error, isError } = useAddCustomerMutation();

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  const addCustomer = useFormik<CreateCustomer>({
    initialValues: {
      name: "",
      shopname: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: addSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!addCustomer.isSubmitting) return;
    let firstElement = Object.keys(addCustomer.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [addCustomer.errors, addCustomer.isSubmitting]);

  useEffect(() => {
    let err: any = error;
    addCustomer.setErrors(err?.fieldErrors || {});
  }, [isError])

  useEffect(() => {
    isSuccess && addCustomer.resetForm();
  }, [isSuccess]);

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Add New Customer
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Register a new customer and their capacity to the system.
            </p>
          </div>
          <Link
            to={"/customers/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >

            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-xl w-150 shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form className="p-8" onSubmit={addCustomer.handleSubmit}>
          <div className="flex flex-col gap-y-6">
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Shop Name
              </label>
              <input
                ref={(el) => {
                  el && (inputRef.current["shopname"] = el);
                }}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter shop name"
                type="text"
                name="shopname"
                value={addCustomer.values.shopname}
                onChange={addCustomer.handleChange}
              />
              {addCustomer.touched.shopname && addCustomer.errors.shopname ? (
                <span className="text-red-500 text-sm">
                  {addCustomer.errors.shopname}
                </span>
              ) : null}
            </div>
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Customer Name
              </label>
              <input

                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter full name"
                type="text"
                name="name"
                value={addCustomer.values.name}
                onChange={addCustomer.handleChange}
              />
              {addCustomer.touched.name && addCustomer.errors.name ? (
                <span className="text-red-500 text-sm">
                  {addCustomer.errors.name}
                </span>
              ) : null}
            </div>
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Email
              </label>
              <input

                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter email address"
                type="email"
                name="email"
                value={addCustomer.values.email}
                onChange={addCustomer.handleChange}
              />
              {addCustomer.touched.email && addCustomer.errors.email ? (
                <span className="text-red-500 text-sm">
                  {addCustomer.errors.email}
                </span>
              ) : null}
            </div>
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Mobile Number
              </label>
              <input
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="9839236789"
                ref={(el) => {
                  el && (inputRef.current["phone"] = el);
                }}
                type="tel"
                maxLength={10}
                name="phone"
                value={addCustomer.values.phone}
                onChange={addCustomer.handleChange}
              />
              {addCustomer.touched.phone && addCustomer.errors.phone ? (
                <span className="text-red-500 text-sm">
                  {addCustomer.errors.phone}
                </span>
              ) : null}
            </div>
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Customer Address
              </label>
              <textarea

                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base min-h-25"
                placeholder="Enter physical shop address"
                name="address"
                value={addCustomer.values.address}
                onChange={addCustomer.handleChange}
              ></textarea>
              {addCustomer.touched.address && addCustomer.errors.address ? (
                <span className="text-red-500 text-sm">
                  {addCustomer.errors.address}
                </span>
              ) : null}
            </div>
          </div>
          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => addCustomer.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              spinner={isPending}
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Add Customer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
