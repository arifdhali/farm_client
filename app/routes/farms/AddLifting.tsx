import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { makeLifting } from "@/types/Farm";
import ComboCheckbox from "@/components/ui/ComboCheckbox";
import { useGetCustomersList } from "@/query/Customers.queries";
import { useGetFarmersList, useGetLastOrderID, useMakeLifitingMutations } from "@/query/Farm.queries";
import { toWords } from "@/hooks/useToWords";
import useDebounce from "@/hooks/useDebounce";

const settlementSchema = Yup.object({
    lifting_date: Yup.date()
        .typeError("Please select a valid date")
        .required("Lifting date is required"),

    user_id: Yup.number()
        .typeError("Please select an user")
        .required("User is required"),

    farm_id: Yup.string()
        .required("Please select a farm"),
    order_id: Yup.string()
        .required("Last Order ID is required"),
    chicks_count: Yup.number()
        .typeError("Chicks count must be a number")
        .required("Chicks count is required")
        .positive("Chicks count must be greater than 0"),

    chicks_weight: Yup.number()
        .typeError("Weight must be a number")
        .required("Total weight is required")
        .positive("Weight must be greater than 0"),

    rate: Yup.number()
        .typeError("Rate must be a number")
        .required("Rate per kg is required")
        .positive("Rate must be greater than 0"),

    paid_amount: Yup.number()
        .typeError("Paid amount must be a number")
        .required("Paid amount is required")
        .test(
            "not-greater",
            "Paid cannot be greater than total amount",
            function (value) {
                const { total_amount } = this.parent;
                return Number(value) <= Number(total_amount);
            }
        ),

});


const AddLifting = () => {
    const [search, setSearch] = useState({
        farmer_search: "",
        customer_search: "",
    });
    let deboundCustomerSearched = useDebounce(search.customer_search, 400);
    let deboundFarmerSearched = useDebounce(search.farmer_search, 400);
    let lifitingMutation = useMakeLifitingMutations();
    const inputRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
    const [openDate, setOpenDate] = useState<boolean>(false);
    const form = useFormik<makeLifting>({
        initialValues: {
            lifting_date: new Date(),
            user_id: null,
            farm_id: "",
            order_id: "",
            chicks_count: 0,
            chicks_weight: 0,
            rate: 0,
            paid_amount: "",
            total_amount: 0,
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: settlementSchema,
        onSubmit: (values) => {
            let payload = {
                ...values,
                lifting_date: format(values.lifting_date, "yyyy-MM-dd"),
            }
            lifitingMutation.mutate(payload, {
                onSuccess: () => {
                    form.resetForm();
                }
            });

        },
    });
    let { data: users } = useGetCustomersList({search: deboundCustomerSearched});
    let { data: farms } = useGetFarmersList({ search: deboundFarmerSearched });
    const { data: lastOrderID } = useGetLastOrderID(Number(form.values.farm_id));
    useEffect(() => {
        if (!form.values.farm_id) return;
        if (lastOrderID?.order_id) {
            form.setFieldValue("order_id", String(lastOrderID.order_id));
        } else {
            form.setFieldValue("order_id", null);
        }

    }, [lastOrderID, form.values.farm_id]);

    useEffect(() => {
        if (!form.isSubmitting) return;
        let firstElement = Object.keys(form.errors)[0];
        firstElement && inputRef.current?.[firstElement]?.focus();
    }, [form.errors, form.isSubmitting]);
    useEffect(() => {
        if (!lifitingMutation.isError) return;
        const error: any = lifitingMutation.error;
        form.setErrors(error.fieldErrors ?? "");
    }, [lifitingMutation.isError]);

    const total = useMemo(() => {
        let amount = (Number(form.values.chicks_weight) || 0) * (Number(form.values.rate) || 0);
        return amount;
    }, [form.values.chicks_weight, form.values.rate]);

    useEffect(() => {
        form.setFieldValue("total_amount", total);
    }, [total]);

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-end gap-3">
                    <div className="flex flex-col ">
                        <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
                            Add Lifting Record
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
                            Register a new lifting record for a farmer and their chicks.
                        </p>
                    </div>
                    <Link
                        to={"/farms/lifting"}
                        className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                        <ArrowLeftIcon />
                        Back to Lifting
                    </Link>
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <form className="p-8" onSubmit={form.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                                Transaction Date
                            </label>
                            <Popover open={openDate} onOpenChange={setOpenDate}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 justify-start font-normal bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                    >
                                        {form.values.lifting_date
                                            ? format(form.values.lifting_date, "dd/MM/yyyy")
                                            : "Select date"}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    className="w-full p-0 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                                    align="start"
                                >
                                    <Calendar
                                        className="w-75"
                                        mode="single"
                                        buttonVariant="outline"
                                        onSelect={(date) => {
                                            if (!date) return;
                                            setOpenDate(false);
                                            form.setFieldValue("lifting_date", date)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>

                            {form.touched.lifting_date && form.errors.lifting_date && (
                                <span className="text-red-500 text-sm">
                                    {form.errors.lifting_date}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                                Customer
                            </label>
                            <ComboCheckbox
                                ref={null}
                                label="customer"
                                items={users?.customers ?? []}
                                selectedId={form.values.user_id}
                                onSearch={(value:string)=>setSearch({...search, customer_search: value})}
                                onSelect={(id) => {
                                    form.setFieldValue("user_id", id);
                                    form.setFieldTouched("user_id", true);
                                }}
                            />
                            {form.touched.user_id && form.errors.user_id && (
                                <span className="text-red-500 text-sm">{form.errors.user_id}</span>
                            )}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                                Farmer
                            </label>
                            <ComboCheckbox
                                ref={null}
                                label="Farmer"
                                items={farms?.farms ?? []}
                                onSearch={(value:string)=> setSearch({...search,farmer_search: value})}
                                selectedId={Number(form.values.farm_id)}
                                onSelect={(id) => {
                                    form.setFieldValue("farm_id", id);
                                    form.setFieldTouched("farm_id", true);
                                }}
                            />
                            {form.touched.farm_id && form.errors.farm_id && (
                                <span className="text-red-500 text-sm">{form.errors.farm_id}</span>
                            )}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                                Last Order ID <span className="text-xs font-normal text-gray-600">(This is last chicks delivery id)</span>
                            </label>
                            <input
                                className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                type="text"
                                name="order_id"
                                ref={(el) => {
                                    el && (inputRef.current["order_id"] = el);
                                }}
                                onChange={form.handleChange}
                                value={form.values.order_id || ""}
                            />
                            {form.touched.order_id && form.errors.order_id ? (
                                <span className="text-red-500 text-sm">
                                    {form.errors.order_id}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                                Chicks Count
                            </label>
                            <input
                                ref={(el) => {
                                    el && (inputRef.current["chicks_count"] = el);
                                }}
                                type="text"
                                name="chicks_count"
                                value={form.values.chicks_count}
                                onChange={form.handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                placeholder="0"
                            />
                            {form.touched.chicks_count && form.errors.chicks_count && (
                                <span className="text-red-500 text-sm">{form.errors.chicks_count}</span>
                            )}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                                Total Weight (kg)
                            </label>
                            <input
                                type="text"
                                name="chicks_weight"
                                value={form.values.chicks_weight}
                                onChange={form.handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                placeholder="0"
                            />
                            {form.touched.chicks_weight && form.errors.chicks_weight && (
                                <span className="text-red-500 text-sm">{form.errors.chicks_weight}</span>
                            )}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                                Rate per kg
                            </label>
                            <input
                                type="text"
                                name="rate"
                                value={form.values.rate}
                                onChange={form.handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                placeholder="0"
                            />
                            {form.touched.rate && form.errors.rate && (
                                <span className="text-red-500 text-sm">{form.errors.rate}</span>
                            )}
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold mb-2">
                                Paid Amount
                            </label>
                            <input
                                type="text"
                                name="paid_amount"
                                value={form.values.paid_amount}
                                onChange={form.handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                                placeholder="0"
                            />
                            {form.touched.paid_amount && form.errors.paid_amount && (
                                <span className="text-red-500 text-sm">{form.errors.paid_amount}</span>
                            )}
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex items-center justify-between mt-8">
                        <div>
                            <p className="text-sm font-medium text-primary">Calculated Settlement</p>
                            <p className="text-xs text-gray-500">Total Weight × Rate</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase text-gray-400">Total</p>
                            <p className="text-3xl font-black text-primary">₹ {Number(total).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}</p>
                            <p>{total > 0 && toWords.convert(Number(total))}</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 flex items-center justify-end gap-4">
                        <button
                            onClick={() => form.resetForm()}
                            type="button"
                            className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white hover:bg-red-500 transition"
                        >
                            Cancel
                        </button>

                        <Button
                            disabled={lifitingMutation.isPending}
                            spinner={lifitingMutation.isPending}
                            type="submit"
                            className="bg-primary h-11 hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
                        >
                            Submit Record
                        </Button>
                    </div>
                </form>

            </div>
        </div>



    );
};

export default AddLifting;
