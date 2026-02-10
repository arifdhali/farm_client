import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAddMutations } from "@/query/Feed.queries";
import type { addFeed } from "@/types/Feed.type";
import { useFormik } from "formik";
import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import * as yup from "yup";


const addFeedSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  feed_type: yup.string()
    .required("Type is required"),
  quantity: yup.number().typeError("Quantity must be a number")
    .required("Quantity is required").positive("Quantity must be a positive number"),
  weight: yup.number()
    .typeError("Weight must be a number")
    .required("Weight is required").positive("Weight must be a positive number"),
  rate: yup.number().typeError("Rate must be a number")
    .required("Rate is required").positive("Rate must be a positive number"),
});
const Add = () => {
  const addFeedMutation = useAddMutations();
  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const [open, setOpen] = useState<boolean>(false);

  const addFeedFormik = useFormik<addFeed>({
    initialValues: {
      name: "",
      feed_type: "",
      weight: 0,
      rate: 40,
      quantity: 0,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: addFeedSchema,
    onSubmit: (values) => {
      addFeedMutation.mutate(values, {
        onSuccess: () => {
          addFeedFormik.resetForm();
        }
      });
    }
  })
  useEffect(() => {
    if (!addFeedFormik.errors) return;
    let firstElement = Object.keys(addFeedFormik.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [addFeedFormik.isSubmitting, addFeedFormik.errors])

  useEffect(() => {
    if (!addFeedMutation.isError) return;
    let error: any = addFeedMutation.error;
    addFeedFormik.setErrors(error.fieldErrors ?? "");
  }, [addFeedMutation.isError])

  const totalWegiht = useMemo(() => {
    return (Number(addFeedFormik.values.quantity * 50));
  }, [addFeedFormik.values.quantity]);

  useEffect(() => {
    addFeedFormik.setFieldValue("weight", totalWegiht);
  }, [totalWegiht]);

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Add Feed
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Add new feed to the system.
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
        <form onSubmit={addFeedFormik.handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Feed Type <span className="font-normal text-sm text-zinc-500">(small, large, medium)</span>
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open}
                    className="w-full border-slate-200 h-12 justify-between bg-white shadow-none capitalize"
                  >
                    {addFeedFormik.values.feed_type
                      ? addFeedFormik.values.feed_type
                      : "Select feed type..."}
                    <ChevronsUpDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-0 border border-slate-200" align="start">
                  <Command className="border-0">
                    <CommandList>
                      <CommandEmpty>No feed type found.</CommandEmpty>
                      <CommandGroup>
                        {
                          Array.from(["small", "medium", "large"]).map((type: any) => (
                            <CommandItem
                              className="capitalize"
                              key={String(type)}
                              value={String(type)}
                              onSelect={(currentValue) => {
                                addFeedFormik.setFieldValue("feed_type", currentValue)
                                setOpen(false)
                              }}
                            >
                              {type}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  addFeedFormik.values.feed_type === type ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))
                        }
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {addFeedFormik.touched.feed_type && addFeedFormik.errors.feed_type ? (
                <span className="text-red-500 text-sm">
                  {addFeedFormik.errors.feed_type}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Name
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Feed name"
                type="text"
                name="name"
                ref={(el) => {
                  el && (inputRef.current["name"] = el);
                }}
                onChange={addFeedFormik.handleChange}
                onBlur={addFeedFormik.handleBlur}
                value={addFeedFormik.values.name}
              />
              {addFeedFormik.touched.name && addFeedFormik.errors.name ? (
                <span className="text-red-500 text-sm">
                  {addFeedFormik.errors.name}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Rate
              </label>
              <input
                readOnly
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Rate"
                type="number"
                value={addFeedFormik.values.rate}
                name="rate"
                ref={(el) => {
                  el && (inputRef.current["rate"] = el);
                }}
                onChange={addFeedFormik.handleChange}
                onBlur={addFeedFormik.handleBlur}
              />
              {addFeedFormik.touched.rate && addFeedFormik.errors.rate ? (
                <span className="text-red-500 text-sm">
                  {addFeedFormik.errors.rate}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Quantity
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Quantity"
                type="number"
                name="quantity"
                ref={(el) => {
                  el && (inputRef.current["quantity"] = el);
                }}
                onChange={addFeedFormik.handleChange}
                onBlur={addFeedFormik.handleBlur}
                value={addFeedFormik.values.quantity}

              />
              {addFeedFormik.touched.quantity && addFeedFormik.errors.quantity ? (
                <span className="text-red-500 text-sm">
                  {addFeedFormik.errors.quantity}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Weight <span className="font-normal text-xs text-zinc-500">50kg/bag</span>
              </label>
              <input
                readOnly
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="Weight"
                type="number"
                name="weight"
                ref={(el) => {
                  el && (inputRef.current["weight"] = el);
                }}
                onChange={addFeedFormik.handleChange}
                onBlur={addFeedFormik.handleBlur}
                value={addFeedFormik.values.weight}
              />
              {addFeedFormik.touched.weight && addFeedFormik.errors.weight ? (
                <span className="text-red-500 text-sm">
                  {addFeedFormik.errors.weight}
                </span>
              ) : null}
            </div>

          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => addFeedFormik.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              disabled={addFeedMutation.isPending}
              spinner={addFeedMutation.isPending}
              className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Add Feed
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Add;
