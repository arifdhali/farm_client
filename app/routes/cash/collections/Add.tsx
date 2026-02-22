import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useFormik } from "formik";
import { format } from "date-fns";
import * as yup from "yup";
import type { AddAmount } from "@/types/Cash.type";
import { useAddCollectionMutations } from "@/query/Cash.queries";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useCutomerLiftingList, useGetCustomersList } from "@/query/Customers.queries";
import { getMeQuery } from "@/query/Auth.queries";
import { useQuery } from "@tanstack/react-query";
import ComboCheckbox from "@/components/ui/ComboCheckbox";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";


const addExpensesSchema = yup.object().shape({
  date: yup.date().required("Date is required"),
  payment_type: yup.string().trim().required("Payment type is required"),
  customer_id: yup.number().nullable().required("Shop is required"),
  batch_id: yup.string().trim("Bath ID must be string"),
  amount_collected: yup.number().typeError("Amount must be a number")
    .required("Amount is required").positive("Amount must be a positive number"),
});

const CollectionAdd = () => {
  const [searchBatchID, setSearchBatchID] = useState("")
  const [open, setOpen] = useState<any>({
    payment_type: false,
    batch_id: false,
  });
  const { data } = useGetCustomersList();
  const { data: user } = useQuery(getMeQuery());

  const { mutate: addCashCollection, isPending, isError, error } = useAddCollectionMutations();

  const addCollectionFormik = useFormik<Omit<AddAmount, "submitted_by">>({
    initialValues: {
      date: new Date(),
      customer_id: null,
      payment_type: "",
      batch_id: "NA",
      is_due: false,
      amount_collected: 0,
    },
    validationSchema: addExpensesSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      let payload = {
        ...values,
        date: format(new Date(values.date), "yyyy-MM-dd"),
        submitted_by: user?.name,

      }
      console.log(payload);

      addCashCollection(payload, {
        onSuccess: () => {
          addCollectionFormik.resetForm();
        },
      })
    }
  });



  useEffect(() => {
    if (!isError) return;
    let err: any = error;
    addCollectionFormik.setErrors(err?.fieldErrors ?? {});
  }, [isError]);

  const { data: liftings } = useCutomerLiftingList(Number(addCollectionFormik?.values.customer_id));

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Add Collections
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Add a new collections to the system.
            </p>
          </div>
          <Link
            to={"/cash/collection"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 w-150 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form onSubmit={addCollectionFormik.handleSubmit} className="p-8">
          <div className="flex flex-col gap-y-6">

            {/* DATE */}
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Date
              </label>

              <Popover
                open={open.select_date}
                onOpenChange={(value) =>
                  setOpen((prev: any) => ({ ...prev, select_date: value }))
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-none justify-start font-normal bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                  >
                    {addCollectionFormik.values.date
                      ? format(new Date(addCollectionFormik.values.date), "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-0 text-base" align="start">
                  <Calendar
                    className="w-75"
                    mode="single"
                    buttonVariant="outline"
                    onSelect={(date) => {
                      if (!date) return;
                      addCollectionFormik.setFieldValue("date", date);
                      setOpen((prev: any) => ({ ...prev, select_date: false }));
                    }}
                  />
                </PopoverContent>
              </Popover>

              {addCollectionFormik.errors.date && (
                <span className="text-red-500 text-sm">
                  {addCollectionFormik.errors.date}
                </span>
              )}
            </div>

            {/* PAYMENT TYPE */}
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Payment type
              </label>

              <Popover
                open={open.payment_type}
                onOpenChange={(value) =>
                  setOpen((prev: any) => ({ ...prev, payment_type: value }))
                }
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox"
                    aria-expanded={open.payment_type}
                    className="w-full border-slate-200 h-12 justify-between bg-white shadow-none capitalize"
                  >
                    {addCollectionFormik.values.payment_type || "Select payment..."}
                    <ChevronsUpDown />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 border border-slate-200" align="start">
                  <Command className="border-0">
                    <CommandList>
                      <CommandEmpty>No payment method found.</CommandEmpty>
                      <CommandGroup>
                        {["cash", "online"].map((payment) => (
                          <CommandItem
                            className="capitalize"
                            key={payment}
                            value={payment}
                            onSelect={(currentValue) => {
                              addCollectionFormik.setFieldValue("payment_type", currentValue);
                              setOpen((prev: any) => ({ ...prev, payment_type: false }));
                            }}
                          >
                            {payment}
                            <Check
                              className={cn(
                                "ml-auto",
                                addCollectionFormik.values.payment_type === payment
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {addCollectionFormik.errors.payment_type && (
                <span className="text-red-500 text-sm">
                  {addCollectionFormik.errors.payment_type}
                </span>
              )}
            </div>


            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Customer name
              </label>

              <ComboCheckbox
                ref={null}
                label="customer"
                items={data?.customers ?? []}
                selectedId={addCollectionFormik.values.customer_id}
                onSelect={(id) => {
                  addCollectionFormik.setFieldValue("customer_id", id);
                  addCollectionFormik.setFieldTouched("customer_id", true);
                }}

              />

              {addCollectionFormik.errors.customer_id && (
                <span className="text-red-500 text-sm">
                  {addCollectionFormik.errors.customer_id}
                </span>
              )}
            </div>
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Enter Lifting ID
              </label>


              <Popover open={open.batch_id}
                onOpenChange={(value) =>
                  setOpen((prev: any) => ({ ...prev, batch_id: value }))
                }>

                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox"
                    aria-expanded={open.payment_type}
                    className="w-full border-slate-200 h-12 justify-between bg-white shadow-none capitalize"
                  >
                    {addCollectionFormik.values.batch_id || "Select lifting..."}
                    <ChevronsUpDown />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 border border-slate-200" align="start">
                  <Command className="border-0">
                    <CommandInput placeholder={`Search bath id...`} value={searchBatchID} onValueChange={(e) => setSearchBatchID(e)} className="border-0" />
                    <CommandList>
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup>
                        {liftings && liftings.map((lift: any) => (
                          <CommandItem
                            className="capitalize"
                            key={lift.id}
                            value={lift.batch_id}
                            onSelect={(currentValue) => {
                              addCollectionFormik.setFieldValue("batch_id", currentValue);
                              setOpen((prev: any) => ({ ...prev, batch_id: false }));
                            }}
                          >
                            {lift.batch_id}
                            <Check
                              className={cn(
                                "ml-auto",
                                addCollectionFormik.values.batch_id === lift.batch_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>

              </Popover>
              {addCollectionFormik.touched.batch_id && addCollectionFormik.errors.batch_id ? (
                <span className="text-red-500 text-sm">
                  {addCollectionFormik.errors.batch_id}
                </span>
              ) : null}
            </div>
            <Field orientation="horizontal" className="">
              <Checkbox
                id="terms-checkbox"
                checked={addCollectionFormik.values.is_due}
                onCheckedChange={(checked) => addCollectionFormik.setFieldValue("is_due", checked)}
              />
              <FieldLabel htmlFor="terms-checkbox" className="cursor-pointer">
                Is it Due amount?
              </FieldLabel>
            </Field>

            {/* AMOUNT */}
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Amount
              </label>
              <input
                name="amount_collected"
                value={addCollectionFormik.values.amount_collected}
                onChange={addCollectionFormik.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter amount"
                type="number"
              />
              {addCollectionFormik.errors.amount_collected && (
                <span className="text-red-500 text-sm">
                  {addCollectionFormik.errors.amount_collected}
                </span>
              )}
            </div>

          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => addCollectionFormik.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>

            <Button
              disabled={isPending}
              spinner={isPending}
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionAdd;
