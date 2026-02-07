import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAddMutations, useEditMutations, useSingleFeedQuery } from "@/query/Feed.queries";
import type { addFeed, editFeed } from "@/types/Feed.type";
import { useFormik } from "formik";
import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import * as yup from "yup";


const editFeedSchema = yup.object().shape({

  quantity: yup.number().typeError("Quantity must be a number")
    .required("Quantity is required").positive("Quantity must be a positive number"),
  weight: yup.number()
    .typeError("Weight must be a number")
    .required("Weight is required").positive("Weight must be a positive number")
});
const Edit = () => {
  const navigate = useNavigate();
  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const { id } = useParams();

  const { data: feed } = useSingleFeedQuery(Number(id));
  const updateMutation = useEditMutations();

  const editFeedFormik = useFormik<editFeed>({
    enableReinitialize: true,
    initialValues: {
      quantity: feed?.quantity || 0,
      weight: feed?.weight || 0,
    },
    validationSchema: editFeedSchema,
    onSubmit: (values) => {
      updateMutation.mutate({ payload: { ...values }, id: Number(id) }, {
        onSuccess: () => {
          navigate("/feeds/list", { replace: true });
        }
      });
    },
  });

  useEffect(() => {
    if (!updateMutation.isError) return;
    let error: any = updateMutation.error;
    editFeedFormik.setErrors(error.fieldErrors ?? "");
  }, [updateMutation.isError])



  return (

    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Edit Feed
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Edit feed details.
            </p>
          </div>
          <Link
            to={"/feeds/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 w-150 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form onSubmit={editFeedFormik.handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Feed Type
              </label>
              <input
                disabled
                readOnly
                className="w-full capitalize rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-200 cursor-not-allowed dark:bg-zinc-800 px-4 py-3"
                type="text"
                name="feed_type"
                value={feed?.feed_type || ""}
              />
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Name
              </label>
              <input
                disabled
                readOnly
                className="w-full  rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-200 cursor-not-allowed dark:bg-zinc-800 px-4 py-3"
                type="text"
                name="name"
                value={feed?.name || ""}
              />

            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Quantity
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Quantity"
                type="text"
                name="quantity"
                ref={(el) => {
                  el && (inputRef.current["quantity"] = el);
                }}
                onChange={editFeedFormik.handleChange}
                onBlur={editFeedFormik.handleBlur}
                value={editFeedFormik.values.quantity}

              />
              {editFeedFormik.touched.quantity && editFeedFormik.errors.quantity ? (
                <span className="text-red-500 text-sm">
                  {editFeedFormik.errors.quantity}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Weight <span className="font-normal text-sm text-zinc-500">(in kg)</span>
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Weight"
                type="text"
                name="weight"
                ref={(el) => {
                  el && (inputRef.current["weight"] = el);
                }}
                onChange={editFeedFormik.handleChange}
                onBlur={editFeedFormik.handleBlur}
                value={editFeedFormik.values.weight}
              />
              {editFeedFormik.touched.weight && editFeedFormik.errors.weight ? (
                <span className="text-red-500 text-sm">
                  {editFeedFormik.errors.weight}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Rate
              </label>
              <input
                disabled
                readOnly
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-200 cursor-not-allowed dark:bg-zinc-800 px-4 py-3"
                placeholder="Rate"
                type="text"
                value={feed?.rate || 0}
                name="rate"
                ref={(el) => {
                  el && (inputRef.current["rate"] = el);
                }}
                onChange={editFeedFormik.handleChange}
                onBlur={editFeedFormik.handleBlur}
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => editFeedFormik.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              disabled={updateMutation.isPending}
              spinner={updateMutation.isPending}
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Update Feed
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Edit;
