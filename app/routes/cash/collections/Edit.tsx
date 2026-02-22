import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useFormik } from "formik";
import { format } from "date-fns";
import * as yup from "yup";
import type { AddAmount, EditAmount } from "@/types/Cash.type";
import { useGetCollectionsListByID, useGetCollectionsUpdateMutations } from "@/query/Cash.queries";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";



const editExpensesSchema = yup.object().shape({
  payment_type: yup.string().trim().required("Payment type is required"),
  amount_collected: yup.number().typeError("Amount must be a number")
    .required("Amount is required").positive("Amount must be a positive number"),
});

const CollectionEdit = () => {
  let { id } = useParams();
  const { data } = useGetCollectionsListByID(Number(id));
  const [currentDate] = useState(new Date());
  const [open, setOpen] = useState({
    payment_type: false,
    select_date: false,
  });
  const navigate = useNavigate();
  let updateMutations = useGetCollectionsUpdateMutations();

  const editCollectionFormik = useFormik<EditAmount>({
    enableReinitialize: true,

    initialValues: {
      date: currentDate,
      customer_name: data?.name || "",
      payment_type: "",
      balanced_amount: data?.balance || 0,
      amount_collected: 0,
    },
    validationSchema: editExpensesSchema,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values) => {
      if (!editCollectionFormik.dirty) return;
      let payload = {
        date: format(new Date(values.date), "yyyy-MM-dd"),
        payment_type: values.payment_type,
        amount_collected: values.amount_collected
      }
      updateMutations.mutate({
        id: Number(id),
        payload
      }, {
        onSuccess: () => {
          editCollectionFormik.resetForm();
          navigate("/cash/collection");
        },
      })
    }
  });

  return (

    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Update Collections
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Update collections to the system.
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
        <form onSubmit={editCollectionFormik.handleSubmit} className="p-8">
          <div className="flex flex-col gap-y-6">

            {/* DATE */}
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Date
              </label>

              <Popover open={open.select_date} onOpenChange={(value) =>
                setOpen((prev: any) => ({
                  ...prev,
                  select_date: value,
                }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-none justify-start font-normal bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base`}
                  >
                    {editCollectionFormik.values.date
                      ? format(editCollectionFormik.values.date, "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger >
                <PopoverContent className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-0 text-base" align="start">
                  <Calendar
                    className="w-75"
                    mode="single"
                    buttonVariant="outline"
                    selected={editCollectionFormik.values.date}
                    onSelect={(date) => {
                      if (!date) return;
                      setOpen((prev: any) => ({ ...prev, select_date: false }));
                      editCollectionFormik.setFieldValue("date", date)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {editCollectionFormik.errors.date && (
                <span className="text-red-500 text-sm">
                  {editCollectionFormik.errors.date}
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
                    {editCollectionFormik.values.payment_type || "Select payment..."}
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
                              editCollectionFormik.setFieldValue("payment_type", currentValue);
                              setOpen((prev: any) => ({ ...prev, payment_type: false }));
                            }}
                          >
                            {payment}
                            <Check
                              className={cn(
                                "ml-auto",
                                editCollectionFormik.values.payment_type === payment
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

              {editCollectionFormik.errors.payment_type && (
                <span className="text-red-500 text-sm">
                  {editCollectionFormik.errors.payment_type}
                </span>
              )}
            </div>


            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Customer name
              </label>

              <input
                readOnly
                name="customer_name"
                value={editCollectionFormik.values.customer_name}
                onChange={editCollectionFormik.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gray-200 cursor-not-allowed dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter amount"
                type="text"
              />

              {editCollectionFormik.errors.customer_name && (
                <span className="text-red-500 text-sm">
                  {editCollectionFormik.errors.customer_name}
                </span>
              )}
            </div>



            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Due Amount
              </label>
              <input
                readOnly
                name="balanced_amount"
                value={editCollectionFormik.values.balanced_amount}
                onChange={editCollectionFormik.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gray-200 cursor-not-allowed dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter amount"
                type="number"
              />
              {editCollectionFormik.errors.balanced_amount && (
                <span className="text-red-500 text-sm">
                  {editCollectionFormik.errors.balanced_amount}
                </span>
              )}
            </div>

            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Amount collected
              </label>
              <input
                name="amount_collected"
                value={editCollectionFormik.values.amount_collected}
                onChange={editCollectionFormik.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter amount"
                type="number"
              />
              {editCollectionFormik.errors.amount_collected && (
                <span className="text-red-500 text-sm">
                  {editCollectionFormik.errors.amount_collected}
                </span>
              )}
            </div>

          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => editCollectionFormik.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>

            <Button
              // disabled={isPending}
              // spinner={isPending}
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

export default CollectionEdit;
