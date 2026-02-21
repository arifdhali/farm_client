import SmallLoading from "@/components/ui/smallLoading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toWords } from "@/hooks/useToWords";
import { getMeQuery } from "@/query/Auth.queries";
import { useAddBonusMutation, useSingleLiftingQuery } from "@/query/Farm.queries";
import type { AddBonusType } from "@/types/Farm";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarRange, DollarSignIcon, IndianRupee, IndianRupeeIcon, Loader2, LucideBriefcaseMedical, LucideInbox, LucidePercent, LucideRabbit, LucideRatio, LucideWeight, LucideWheat, Shield, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { useParams, useSearchParams } from "react-router";

const SingleLifting = () => {

    let { farm_id } = useParams();
    const [searchParams] = useSearchParams();
    const order_id = searchParams.get("order_id");
    const { data: view, isLoading } = useSingleLiftingQuery({ farm_id, order_id });
    const addBonusMutation = useAddBonusMutation();
    const { data: user } = useQuery(getMeQuery());
    const [bonus, setBonus] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [isBounsAdded, setIsBonusAdded] = useState<boolean>(false);


    useEffect(() => {
        setTotalPayment(Number(view?.finance?.farmer_payment) + Number(bonus));
        if (view?.finance?.farmer_bonus) {
            setIsBonusAdded(true);
            setBonus(Number(view?.finance?.farmer_bonus));
        }
    }, [bonus, view?.finance?.farmer_payment, view?.finance?.farmer_bonus]);


    const handleBounsForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let payload: AddBonusType = {
            farm_id: Number(farm_id),
            batch_id: String(order_id),
            bonus: Number(bonus)
        }
        addBonusMutation.mutate(payload, {
            onSuccess: () => {
                setIsBonusAdded(true);
            }
        });
    }

    return (

        <>
            {
                isLoading ? (
                    <div className="h-screen flex justify-center items-center">
                        <SmallLoading />
                    </div>) : (

                    <div className="report-container px-8 py-6 bg-white dark:bg-[#1a2b2e]  dark:border-[#2a3a3d]  rounded-xl overflow-hidden flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-primary pb-8 mb-8 gap-6">
                            <div>
                                <div className="leading-none">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Lifting Report</span>
                                    <h2 className="text-2xl font-bold">{view?.farm_name}</h2>
                                </div>
                                <p className="text-sm text-[#658086] max-w-xs">123 Industrial Ave, Farming District, 45902. Contact: logistics@agrifarm.com</p>
                            </div>
                            <div className="text-left md:text-right">
                                <h3 className="text-3xl font-extrabold text-[#121617] dark:text-white mb-1">Lifting Summary</h3>
                                <p className="text-sm font-medium text-[#658086] uppercase tracking-tighter mb-4">Report ID: {order_id}</p>
                                <div className="inline-flex flex-col bg-background-light dark:bg-[#2a3a3d] p-3 rounded-lg border border-[#dce3e5] dark:border-[#3a4a4d]">
                                    <span className="text-[10px] font-bold text-[#658086] uppercase">lifting ID</span>
                                    <span className="text-sm font-bold">{order_id}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between gap-4 mb-8 bg-[#f8fafa] dark:bg-[#203033] p-4 rounded-lg border border-[#dce3e5] dark:border-[#2a3a3d]">
                            <div className="flex items-center gap-2">
                                <CalendarRange className="text-primary text-[20px]" />
                                <span className="text-sm font-medium">Generated on: <span className="font-bold">{format(new Date(), "MMM dd, yyyy hh:mm a")}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-primary text-[20px]" />
                                <span className="text-sm font-medium">Authorized by: <span className="font-bold">{user?.name}</span></span>
                            </div>
                        </div>
                        <div className="grow">
                            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                                <Table className="w-full ">
                                    <TableHeader>
                                        <TableRow className="dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <TableHead className=" rounded-tl-lg">
                                                Date
                                            </TableHead>
                                            <TableHead className="">
                                                Farmer
                                            </TableHead>
                                            <TableHead className="">
                                                Customer
                                            </TableHead>
                                            <TableHead className="text-center">
                                                Chicks
                                            </TableHead>
                                            <TableHead className=" text-center">
                                                Weight
                                            </TableHead>
                                            <TableHead className="text-center">
                                                Rate
                                            </TableHead>
                                            <TableHead className=" text-center">
                                                Paid
                                            </TableHead>
                                            <TableHead className=" text-center">
                                                Balance
                                            </TableHead>
                                            <TableHead className=" text-center">
                                                Total
                                            </TableHead>

                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="text-xs">
                                        {view?.lift?.map((v: any, index: number) => (
                                            <TableRow key={index} className="border-b border-[#dce3e5] dark:border-[#2a3a3d]  transition-colors">
                                                <TableCell className="">
                                                    {v?.liftings?.lifting_date}
                                                </TableCell>
                                                <TableCell className="font-bold">
                                                    {v?.name}
                                                </TableCell>
                                                <TableCell className="">
                                                    {v?.liftings?.customer?.name}
                                                </TableCell>
                                                <TableCell className="text-center   ">
                                                    {v?.liftings?.chicks_count} <sup>Qty</sup>
                                                </TableCell>
                                                <TableCell className="text-center   ">
                                                    {v?.liftings?.chicks_weight} <sup>kg</sup>
                                                </TableCell>
                                                <TableCell className="text-center   ">
                                                    {v?.liftings?.rate}
                                                </TableCell>
                                                <TableCell className="text-green-600 text-center">
                                                    {v?.liftings?.paid_amount}
                                                </TableCell>
                                                <TableCell className="text-red-600 text-center">
                                                    {v?.liftings?.balance_amount}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {v?.liftings?.total_amount}
                                                </TableCell>
                                            </TableRow>

                                        ))}
                                        <TableRow className="bg-gray-200 text-primary text-lg font-bold">
                                            <TableCell colSpan={6} className="text-primary">
                                                Total Amount
                                            </TableCell>
                                            <TableCell colSpan={3} className="text-right pr-4" >
                                                <div className="flex items-center justify-end">
                                                    <IndianRupee size={17} />
                                                    {view?.total?.total_sales_amount ? Number(view?.total?.total_sales_amount).toLocaleString("en-IN", {
                                                        minimumFractionDigits: 2
                                                    }) : 0}
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                        {/* Repeat remaining rows exactly the same */}
                                    </TableBody>
                                </Table>

                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t-2 border-[#dce3e5] dark:border-[#2a3a3d]">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Period Aggregates</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* <div className="bg-[#f8fafa] dark:bg-[#203033] border border-[#dce3e5] dark:border-[#3a4a4d] p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <LucideWheat className="text-primary text-sm" />
                                <p className="text-[10px] font-bold text-[#658086] uppercase">Total Feed</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black">{view?.total?.total_feed_weight}</span>
                                <span className="text-[10px] font-medium text-[#658086]">kg</span>
                            </div>
                        </div> */}
                                <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideBriefcaseMedical className="text-green-500 text-sm" />
                                        <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">Total Medicine</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] font-medium text-green-600 dark:text-green-400"><IndianRupee /></span>
                                        <span className="text-2xl font-black text-green-700 dark:text-green-400">{view?.total?.total_medicine_price}</span>
                                    </div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideRabbit className="text-red-500 text-sm" />
                                        <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">Total Mortality</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-red-700 dark:text-red-400">{view?.total?.total_morality}</span>
                                        <span className="text-[10px] font-medium text-red-600 dark:text-red-400">Birds</span>
                                    </div>
                                </div>
                                <div className="bg-primary/5 dark:bg-primary/20 border border-primary/20 p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideInbox className="text-primary text-sm" />
                                        <p className="text-[10px] font-bold text-primary uppercase">Lifted chicks</p>
                                    </div>
                                    <div className="flex items-baseline gap-1 text-primary">
                                        <span className="text-2xl font-black">{view?.total?.total_chicks_quantity}</span>
                                        <span className="text-[10px] font-medium text-primary">Birds</span>
                                    </div>
                                </div>
                                <div className="bg-amber-100/20  dark:bg-primary/20 border border-primary/20 p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideInbox className="text-amber text-sm" />
                                        <p className="text-[10px] font-bold text-amber uppercase">Lifting chicks weight</p>
                                    </div>
                                    <div className="flex items-baseline gap-1 text-amber">
                                        <span className="text-2xl font-black">{view?.total?.total_chicks_weight}</span>
                                        <span className="text-[10px] font-medium text-amber">kg</span>
                                    </div>
                                </div>
                                <div className="bg-amber-100/20  dark:bg-primary/20 border border-primary/20 p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideInbox className="text-amber text-sm" />
                                        <p className="text-[10px] font-bold text-amber uppercase">Total Given Chicks</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-amber">
                                        <span className="text-[10px] font-medium text-amber">Qty</span>
                                        <span className="text-2xl font-black">{view?.total?.total_delivered_chicks}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-amber">
                                        <span className="text-[10px] font-medium text-amber"><IndianRupee size={16} /></span>
                                        <span className="text-2xl font-black">{Number(view?.total?.total_chicks_price).toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                                <div className="bg-primary/5 dark:bg-primary/20 border border-primary/20 p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideWeight className="text-primary text-sm" />
                                        <p className="text-[10px] font-bold text-primary uppercase opacity-80">Total Feed Weight</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] font-medium text-primary">kg</span>
                                        <span className="text-2xl font-black ">{view?.total?.total_feed_weights}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] font-medium text-primary"><IndianRupee size={16} /></span>
                                        <span className="text-2xl font-black">{Number(view?.total?.feed_price_total).toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                                <div className="bg-[#f8fafa] dark:bg-[#203033] border text-primary border-[#dce3e5] dark:border-[#3a4a4d] p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideRatio className="text-primary-500 text-sm" />
                                        <p className="text-[10px] font-bold uppercase opacity-80">FCR (Feed Conv. Ratio)</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black">{view?.fcr}</span>
                                        <span className="text-[12px] font-medium opacity-80">Ratio</span>
                                    </div>
                                </div>
                                <div className="bg-[#f8fafa] dark:bg-[#203033] border text-primary border-[#dce3e5] dark:border-[#3a4a4d] p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucidePercent className="text-primary-500 text-sm" />
                                        <p className="text-[10px] font-bold uppercase opacity-80">Chicks Weight Average </p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black">{view?.avg}</span>
                                        <span className="text-[12px] font-medium opacity-80">KG</span>
                                    </div>
                                </div>
                                <div className="bg-[#f8fafa] dark:bg-[#203033] border text-primary border-[#dce3e5] dark:border-[#3a4a4d] p-5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LucideWeight className="text-primary-500 text-sm" />
                                        <p className="text-[10px] font-bold uppercase opacity-80">Total Cost </p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black">{view?.per_chicks}</span>
                                        <span className="text-[12px] font-medium opacity-80">avg</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-primary flex items-center  mt-6 mb-2">Farmer Payment</h3>
                            <div className=" flex flex-wrap gap-6 items-start bg-[#f0f3f4] dark:bg-[#2a3a3d] p-4 rounded-lg border border-[#dce3e5] dark:border-[#3a4a4d]">
                                <div>
                                    <p className="text-[10px] font-bold text-[#658086] uppercase mb-1">Commision</p>
                                    <p className="text-xl font-bold flex items-center">
                                        <IndianRupeeIcon size={18} />
                                        {view?.finance?.farmer_commision}</p>
                                </div>
                                <div className="h-10 w-px bg-[#c1c1c1] dark:bg-[#3a4a4d]"></div>
                                <div>
                                    <div className="flex gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="text-[10px] font-bold text-[#658086] uppercase mb-1">Add Bonus</label>
                                            <form onSubmit={handleBounsForm} className="flex items-center gap-2">
                                                <input type="text"
                                                    disabled={isBounsAdded}
                                                    name="bonus"
                                                    onChange={(e) => setBonus(e.target.value as any)}
                                                    autoComplete="off"
                                                    placeholder="Amount"
                                                    value={bonus}
                                                    className={`w-25 rounded-lg border border-zinc-200 dark:border-zinc-700 ${isBounsAdded || view?.finance?.farmer_bonus ? "bg-gray-300 dark:bg-zinc-700" : "bg-white dark:bg-zinc-800"} text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base`}
                                                />
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button disabled={isBounsAdded || addBonusMutation.isPending} type="submit">
                                                            {addBonusMutation.isPending ? (
                                                                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                                                            ) : (
                                                                <CheckmarkIcon />

                                                            )}
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>{isBounsAdded || view?.finance?.farmer_bonus ? "Bonus Already Added" : "Add Bonus"}</TooltipContent>
                                                </Tooltip>
                                            </form>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-[#658086] uppercase mb-1">Total Payment</p>
                                            <p className="text-xl font-bold flex items-center">
                                                <IndianRupeeIcon size={18} />
                                                <span>
                                                    {totalPayment.toLocaleString("en-IN")}</span>
                                            </p>
                                            <span className="text-xs">{toWords.convert(view?.finance?.farmer_payment)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                view?.finance?.owner_profit && (
                                    <>
                                        <h3 className="text-lg font-bold text-primary flex items-center  mt-6 mb-2">Owner Payment</h3>
                                        <div className=" flex flex-wrap gap-6 items-start bg-[#f0f3f4] dark:bg-[#2a3a3d] p-4 rounded-lg border border-[#dce3e5] dark:border-[#3a4a4d]">
                                            <div>
                                                <p className="text-[10px] font-bold  uppercase mb-1">Total {`${view?.finance?.owner_profit > 0 ? 'Profit' : 'Loss'}`}</p>
                                                <p className={`text-xl font-bold flex items-center ${view?.finance?.owner_profit > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    <IndianRupeeIcon size={18} />
                                                    {Number(view?.finance?.owner_profit).toLocaleString("en-IN", {
                                                        minimumFractionDigits: 2
                                                    })}
                                                </p>
                                                <span className="text-xs">{toWords.convert(view?.finance?.owner_profit)}</span>
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                        </div>

                    </div>
                )
            }
        </>
    );
}

export default SingleLifting;