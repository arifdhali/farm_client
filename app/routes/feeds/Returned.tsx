import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import ComboCheckbox, { type ComboCheckboxRef } from "@/components/ui/ComboCheckbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useGetFarmersList, useGetLastOrderID } from "@/query/Farm.queries";
import { useFeedReturnedMutation, useGetFeedListQuery } from "@/query/Feed.queries";
import type { returnFeed } from "@/types/Feed.type";
import { format } from "date-fns";
import { useFormik } from "formik";
import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import * as yup from "yup";


const returnedFeedSchema = yup.object().shape({
  returned_date: yup.date().required("Returned date is required"),
  feed_id: yup.string()
    .required("Feed is required"),
  farm_id: yup.number().typeError("Farm must be a number").required("Farm is required"),
  batch_id: yup.string().required("Batch id is required"),
  quantity: yup.number().typeError("Quantity must be a number")
    .required("Quantity is required").positive("Quantity must be a positive number"),
  weight: yup.number()
    .typeError("Weight must be a number")
    .required("Weight is required").positive("Weight must be a positive number"),
});
const Add = () => {
  const [search, setSearch] = useState("");
  let deboundSearched = useDebounce(search, 400);
  const farmerRef = useRef<ComboCheckboxRef>(null);

  const returnedFeedMutation = useFeedReturnedMutation();
  const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const { data } = useGetFarmersList({search: deboundSearched});

  const [open, setOpen] = useState<any>({
    select_feed: false,
    select_date: false,
  });
  const returnedFeedFormik = useFormik<returnFeed>({
    initialValues: {
      returned_date: new Date(),
      feed_id: null,
      weight: 0,
      quantity: 0,
      farm_id: null,
      batch_id: null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: returnedFeedSchema,
    onSubmit: (values) => {
      let payload = {
        ...values,
        returned_date: format(values.returned_date, "yyyy-MM-dd"),
      }
      returnedFeedMutation.mutate(payload, {
        onSuccess: () => {
          returnedFeedFormik.resetForm();
        }
      });
    }
  })
  useEffect(() => {
    if (!returnedFeedFormik.errors) return;
    let firstElement = Object.keys(returnedFeedFormik.errors)[0];
    firstElement && inputRef.current?.[firstElement]?.focus();
  }, [returnedFeedFormik.isSubmitting, returnedFeedFormik.errors])

  useEffect(() => {
    if (!returnedFeedMutation.isError) return;
    let error: any = returnedFeedMutation.error;
    returnedFeedFormik.setErrors(error.fieldErrors ?? "");
  }, [returnedFeedMutation.isError])

  const totalWeight = useMemo(() => {
    return (Math.floor(Number(returnedFeedFormik.values.quantity * 50) * 100) / 100);
  }, [returnedFeedFormik.values.quantity]);

  useEffect(() => {
    returnedFeedFormik.setFieldValue("weight", totalWeight);
  }, [totalWeight]);

  const { data: lastOrderID } = useGetLastOrderID(Number(returnedFeedFormik.values.farm_id));
  useEffect(() => {
    if (!returnedFeedFormik.values.farm_id) return;

    if (lastOrderID?.order_id) {
      returnedFeedFormik.setFieldValue("batch_id", String(lastOrderID.order_id));
    } else {
      returnedFeedFormik.setFieldValue("batch_id", "");

    }
  }, [lastOrderID, returnedFeedFormik.values.farm_id]);
  const { data: feed } = useGetFeedListQuery();
  const selectedFeed = useMemo(() => {
    if (!returnedFeedFormik.values.feed_id || !feed) return;
    return feed?.feeds.find((f: any) => f.id == returnedFeedFormik.values.feed_id);
  }, [returnedFeedFormik.values.feed_id, feed]);

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
        <form onSubmit={returnedFeedFormik.handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Feed Type <span className="font-normal text-sm text-zinc-500">(small, large, medium)</span>
              </label>
              <Popover open={open.select_feed} onOpenChange={(value) =>
                setOpen((prev: any) => ({
                  ...prev,
                  select_feed: value,
                }))}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open.select_feed}
                    className="w-full border-slate-200 h-12 justify-between bg-white shadow-none capitalize"
                  >
                    {selectedFeed?.feed_type
                      ? selectedFeed?.feed_type
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
                          feed && feed?.feeds.map((type: any, index: number) => (
                            <CommandItem
                              className="capitalize"
                              key={index}
                              value={String(type.id)}
                              onSelect={(currentValue) => {
                                returnedFeedFormik.setFieldValue("feed_id", currentValue)
                                setOpen((prev: any) => ({
                                  ...prev,
                                  select_feed: false
                                }));
                              }}
                            >
                              {type?.feed_type}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  selectedFeed?.id === type?.id ? "opacity-100" : "opacity-0"
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
              {returnedFeedFormik.touched.feed_id && returnedFeedFormik.errors.feed_id ? (
                <span className="text-red-500 text-sm">
                  {returnedFeedFormik.errors.feed_id}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
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
                    {returnedFeedFormik.values.returned_date
                      ? format(returnedFeedFormik.values.returned_date, "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger >
                <PopoverContent className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-0 text-base" align="start">
                  <Calendar
                    className="w-75"
                    mode="single"
                    buttonVariant="outline"
                    selected={returnedFeedFormik.values.returned_date}
                    onSelect={(date) => {
                      if (!date) return;
                      setOpen({
                        select_date: false
                      });
                      returnedFeedFormik.setFieldValue("returned_date", date)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {returnedFeedFormik.touched.returned_date && returnedFeedFormik.errors.returned_date ? (
                <span className="text-red-500 text-sm">
                  {returnedFeedFormik.errors.returned_date}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Select Farmer
              </label>

              <ComboCheckbox
                ref={farmerRef}
                label="Farmers"
                items={data?.farms ?? []}
                onSearch={(value:string)=>setSearch(value)}
                selectedId={returnedFeedFormik.values.farm_id}
                onSelect={(id) => {
                  returnedFeedFormik.setFieldValue("farm_id", id);
                  returnedFeedFormik.setFieldTouched("farm_id", true);
                }}
              />

              {returnedFeedFormik.touched.farm_id && returnedFeedFormik.errors.farm_id ? (
                <span className="text-red-500 text-sm">
                  {returnedFeedFormik.errors.farm_id}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Last Order ID <span className="text-xs font-normal text-gray-600">(This is last chicks delivery id)</span>
              </label>
              <input
                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"

                type="text"
                name="batch_id"
                ref={(el) => {
                  el && (inputRef.current["batch_id"] = el);
                }}
                onChange={returnedFeedFormik.handleChange}
                onBlur={returnedFeedFormik.handleBlur}
                value={returnedFeedFormik.values.batch_id || ""}
              />

              {returnedFeedFormik.touched.batch_id && returnedFeedFormik.errors.batch_id ? (
                <span className="text-red-500 text-sm">
                  {returnedFeedFormik.errors.batch_id}
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
                onChange={returnedFeedFormik.handleChange}
                onBlur={returnedFeedFormik.handleBlur}
                value={returnedFeedFormik.values.quantity}

              />
              {returnedFeedFormik.touched.quantity && returnedFeedFormik.errors.quantity ? (
                <span className="text-red-500 text-sm">
                  {returnedFeedFormik.errors.quantity}
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
                onChange={returnedFeedFormik.handleChange}
                onBlur={returnedFeedFormik.handleBlur}
                value={returnedFeedFormik.values.weight}
              />
              {returnedFeedFormik.touched.weight && returnedFeedFormik.errors.weight ? (
                <span className="text-red-500 text-sm">
                  {returnedFeedFormik.errors.weight}
                </span>
              ) : null}
            </div>

          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              onClick={() => returnedFeedFormik.resetForm()}
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <Button
              // disabled={returnedFeedMutation.isPending}
              // spinner={returnedFeedMutation.isPending}
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
