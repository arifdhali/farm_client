import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useFormik } from "formik";
import { format } from "date-fns";
import * as yup from "yup";
import type { cashType } from "@/types/Cash.type";
import { useAddCashMutations } from "@/query/Cash.queries";


const addExpensesSchema = yup.object().shape({
  date: yup.date().required("Date is required"),
  expenses_type: yup.string().trim().required("Expenses type is required"),
  amount: yup.number()
    .required("Amount is required").positive("Amount must be a positive number"),

});

const Add = () => {
  const [openDate, setOpenDate] = useState<boolean>(false);
  const { mutate: addCash, isPending, isError, error } = useAddCashMutations();
  const addExpensesFormik = useFormik<cashType>({
    initialValues: {
      date: new Date(),
      expenses_type: "",
      amount: 0
    },
    validationSchema: addExpensesSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      let payload = {
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
      }
      addCash(payload, {
        onSuccess: (data) => {
          addExpensesFormik.resetForm();
        },
      })
    }
  });

  useEffect(() => {
    if (!isError) return;
    let err: any = error;
    addExpensesFormik.setErrors(err.fieldErrors ?? "");
  }, [isError])


  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Add Expense
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Add a new expense to the system.
            </p>
          </div>
          <Link
            to={"/cash/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 w-150 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form onSubmit={addExpensesFormik.handleSubmit} className="p-8">
          <div className="flex flex-col gap-y-6">
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Date
              </label>

              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-none justify-start font-normal bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base`}
                  >
                    {addExpensesFormik.values.date
                      ? format(addExpensesFormik.values.date, "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger >
                <PopoverContent className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-0 text-base" align="start">
                  <Calendar
                    className="w-75"
                    mode="single"
                    buttonVariant="outline"
                    onSelect={(date) => {
                      if (!date) return;
                      setOpenDate(false);
                      addExpensesFormik.setFieldValue("date", date)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {addExpensesFormik.touched.date && addExpensesFormik.errors.date ? (
                <span className="text-red-500 text-sm">
                  {addExpensesFormik.errors.date}
                </span>
              ) : null}
            </div>
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Expense Type
              </label>
              <input
                name="expenses_type"
                value={addExpensesFormik.values.expenses_type}
                onChange={addExpensesFormik.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter expense type"
                type="text"
              />
              {addExpensesFormik.touched.expenses_type && addExpensesFormik.errors.expenses_type ? (
                <span className="text-red-500 text-sm">
                  {addExpensesFormik.errors.expenses_type}
                </span>
              ) : null}
            </div>
            <div className="">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Amount
              </label>
              <input
                name="amount"
                value={addExpensesFormik.values.amount}
                onChange={addExpensesFormik.handleChange}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Enter amount"
                type="text"
              />
              {addExpensesFormik.touched.amount && addExpensesFormik.errors.amount ? (
                <span className="text-red-500 text-sm">
                  {addExpensesFormik.errors.amount}
                </span>
              ) : null}
            </div>
          </div>
          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => addExpensesFormik.resetForm()}
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
              Add Expense
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
