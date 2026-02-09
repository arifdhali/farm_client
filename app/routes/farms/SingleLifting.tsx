import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMeQuery } from "@/query/Auth.queries";
import { useSingleLiftingQuery } from "@/query/Farm.queries";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarRange, DollarSignIcon, LucideBriefcaseMedical, LucideInbox, LucideRabbit, LucideWeight, LucideWheat, Shield, ShieldCheck } from "lucide-react";
import { useParams, useSearchParams } from "react-router";

const SingleLifting = () => {

    let { farm_id } = useParams();
    const [searchParams] = useSearchParams();
    const order_id = searchParams.get("order_id");
    const { data: view } = useSingleLiftingQuery({ farm_id, order_id });
    const { data: user } = useQuery(getMeQuery());
    return (

        <>

            <div className="report-container px-8 py-6 bg-white dark:bg-[#1a2b2e]  dark:border-[#2a3a3d]  rounded-xl overflow-hidden flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-primary pb-8 mb-8 gap-6">
                    <div>
                        <div className="leading-none">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Lifting Report</span>
                            <h2 className="text-2xl font-bold">Sohana Poultry Farm</h2>
                        </div>
                        <p className="text-sm text-[#658086] max-w-xs">123 Industrial Ave, Farming District, 45902. Contact: logistics@agrifarm.com</p>
                    </div>
                    <div className="text-left md:text-right">
                        <h3 className="text-3xl font-extrabold text-[#121617] dark:text-white mb-1">Lifting Summary</h3>
                        <p className="text-sm font-medium text-[#658086] uppercase tracking-tighter mb-4">Report ID: #LIFT-2023-OCT-07-COMP</p>
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
                                {view?.lift?.map((v) => (
                                    <TableRow className="border-b border-[#dce3e5] dark:border-[#2a3a3d]  transition-colors">
                                        <TableCell className="">
                                            2023-10-01
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
                                    <TableCell colSpan={3} className="text-right pr-1.5" >
                                        {view?.totals?.total_amount ? view?.totals?.total_amount : ""}/-
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
                        <div className="bg-[#f8fafa] dark:bg-[#203033] border border-[#dce3e5] dark:border-[#3a4a4d] p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <LucideWheat className="text-primary text-sm" />
                                <p className="text-[10px] font-bold text-[#658086] uppercase">Total Feed</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black">{view?.totals?.total_feed_weight}</span>
                                <span className="text-[10px] font-medium text-[#658086]">kg</span>
                            </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <LucideBriefcaseMedical className="text-green-500 text-sm" />
                                <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">Total Medicine</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-green-700 dark:text-green-400">75</span>
                                <span className="text-[10px] font-medium text-green-600 dark:text-green-400">Birds</span>
                            </div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <LucideRabbit className="text-red-500 text-sm" />
                                <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">Total Mortality</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-red-700 dark:text-red-400">75</span>
                                <span className="text-[10px] font-medium text-red-600 dark:text-red-400">Birds</span>
                            </div>
                        </div>
                        <div className="bg-primary/5 dark:bg-primary/20 border border-primary/20 p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <LucideInbox className="text-primary text-sm" />
                                <p className="text-[10px] font-bold text-primary uppercase">Total Lifting</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black">{view?.totals?.total_lift_chicks}</span>
                                <span className="text-[10px] font-medium text-primary">Birds</span>
                            </div>
                        </div>
                        <div className="bg-primary text-white border border-primary p-5 rounded-xl shadow-lg shadow-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                                <LucideWeight className="text-white text-sm" />
                                <p className="text-[10px] font-bold uppercase opacity-80">Total Weight</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black">19,230.00</span>
                                <span className="text-[10px] font-medium opacity-80">kg</span>
                            </div>
                        </div>
                        <div className="bg-[#f8fafa] dark:bg-[#203033] border text-primary border-[#dce3e5] dark:border-[#3a4a4d] p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <LucideWeight className="text-primary-500 text-sm" />
                                <p className="text-[10px] font-bold uppercase opacity-80">FCR (Feed Conv. Ratio)</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black">1.45</span>
                                <span className="text-[10px] font-medium opacity-80">ratio</span>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-primary flex items-center  mt-6 mb-2"><DollarSignIcon /> Farmer Payment</h3>
                    <div className=" flex flex-wrap gap-6 items-center bg-[#f0f3f4] dark:bg-[#2a3a3d] p-4 rounded-lg border border-[#dce3e5] dark:border-[#3a4a4d]">
                        <div>
                            <p className="text-[10px] font-bold text-[#658086] uppercase mb-1">Commision</p>
                            <p className="text-xl font-bold">2.28 kg</p>
                        </div>
                        <div className="h-8 w-px bg-[#dce3e5] dark:bg-[#3a4a4d]"></div>
                        <div>
                            <p className="text-[10px] font-bold text-[#658086] uppercase mb-1">Total Payment</p>
                            <p className="text-xl font-bold">1.35</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SingleLifting;