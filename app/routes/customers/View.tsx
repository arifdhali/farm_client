import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetReportFarmerQuery } from '@/query/Reports.queries';
import SmallLoading from '@/components/ui/smallLoading';
import { IndianRupee } from 'lucide-react';


const FarmReport = () => {
    const { data, isLoading } = useGetReportFarmerQuery();
    console.log(data?.reports);
    return (
        <>

            <section className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 border border-gray-300 rounded-lg">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Total Paid Amount</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-text-charcoal dark:text-white">{data?.total_data?.total_chick}</h3>
                        <span className="text-emerald-600 text-xs font-bold mb-1 flex items-center">
                            <IndianRupee />
                        </span>
                    </div>
                </div>
                <div className="p-5 border border-gray-300 bg-white rounded-lg">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Total Due Amount</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-text-charcoal dark:text-white">{data?.total_data?.total_mortality}</h3>
                        <span className="text-rose-600 text-xs font-bold mb-1 flex items-center">
                            <span className="material-symbols-outlined text-sm">                             <IndianRupee />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="p-5 border border-gray-300 bg-white rounded-lg">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Total Sales Amount</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-text-charcoal dark:text-white">{Number(data?.total_data?.avg_feed_used).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                        })} </h3>
                        <span className="text-emerald-600 text-xs font-bold mb-1 flex items-center">
                            <IndianRupee />
                        </span>
                    </div>
                </div>
            </section>
            <section className='bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mt-6'>
                <div className="overflow-x-auto @container">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                                    Farmer Name
                                </TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase ">
                                    Lifted Date
                                </TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                    Chicks Qty
                                </TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                    Chicks weight (kg)
                                </TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                    Due Amount
                                </TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                    Paid Amount
                                </TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                    Total Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {
                                isLoading && (
                                    <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                        <TableCell
                                            colSpan={7}
                                            className="px-6 py-4 text-center"
                                        >
                                            <SmallLoading />
                                        </TableCell>
                                    </TableRow>

                                )
                            }
                            {!isLoading && data?.reports.length > 0 && (
                                data?.reports.map((farm: any) => (
                                    <TableRow
                                        key={farm.id}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                <span className="font-semibold text-sm">
                                                    {farm?.farmer_name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                                            {farm?.delivery_date}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                            {farm?.chicks_supplied}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                            {farm?.feed_used}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                            {farm?.medicine_price}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">

                                            {farm?.batch_days}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">

                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-xl">{farm?.mortality}</span>

                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            {(!isLoading && data?.reports?.length === 0) && (
                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                    <TableCell
                                        colSpan={7}
                                        className="px-6 py-4 text-center"
                                    >
                                        No records
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </>
    )
}

export default FarmReport