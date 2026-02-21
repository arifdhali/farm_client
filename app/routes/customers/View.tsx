import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SmallLoading from '@/components/ui/smallLoading';
import { IndianRupee } from 'lucide-react';
import { useCutomerByIdQuery } from '@/query/Customers.queries';
import { useParams } from 'react-router';
import { format } from 'date-fns';


const FarmReport = () => {
    const { id } = useParams();
    console.log(id)
    const { data, isLoading } = useCutomerByIdQuery(Number(id));

    return (
        <>

            <section className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 border border-gray-300 rounded-lg">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Total Paid Amount</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-text-charcoal dark:text-white">{Number(data?.totals?.total_paid_amount).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                        })}</h3>
                        <span className="text-emerald-600 text-xs font-bold mb-1 flex items-center">
                            <IndianRupee />
                        </span>
                    </div>
                </div>
                <div className="p-5 border border-gray-300 bg-white rounded-lg">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Total Due Amount</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-text-charcoal dark:text-white">{Number(data?.totals?.total_balance_amount).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                        })}</h3>
                        <span className="text-rose-600 text-xs font-bold mb-1 flex items-center">
                            <span className="material-symbols-outlined text-sm">                             <IndianRupee />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="p-5 border border-gray-300 bg-white rounded-lg">
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Total Sales Amount</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-text-charcoal dark:text-white">{Number(data?.totals?.total_purchase_amount).toLocaleString("en-IN", {
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

                                <TableHead className="px-6 py-4 text-xs font-bold uppercase ">
                                    Bath Id
                                </TableHead>

                                <TableHead className="px-6 py-4 text-xs font-bold uppercase ">
                                    Lifted Date
                                </TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                                    Farmer Name
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
                                            colSpan={8}
                                            className="px-6 py-4 text-center"
                                        >
                                            <SmallLoading />
                                        </TableCell>
                                    </TableRow>

                                )
                            }
                            {!isLoading && data?.liftings.length > 0 && (
                                data?.liftings.map((lift: any, index) => (
                                    <TableRow
                                        key={index}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                                            {lift?.batch_id}
                                        </TableCell>


                                        <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                                            {format(new Date(lift?.lifting_date), "dd/MM/yyyy")}
                                        </TableCell>

                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                <span className="font-semibold text-sm">
                                                    {lift?.farm?.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                            {lift?.total_chicks_count}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                            {lift?.total_chicks_weight}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-medium text-center ">
                                            <div className="flex items-center bg-red-100 rounded-xl px-3 w-fit justify-center mx-auto">
                                                <IndianRupee className='text-red-600' size={13} />
                                                <span className=" text-red-600  py-1 ">{lift?.total_balance_amount}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                            <div className="flex items-center bg-green-100 rounded-xl px-3 w-fit justify-center mx-auto">
                                                <IndianRupee className='text-green-600' size={13} />
                                                <span className=" text-green-600  py-1 ">{lift?.total_paid_amount}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">

                                            <div className="flex items-center bg-emerald-200 rounded-xl px-3 w-fit justify-center mx-auto">
                                                <IndianRupee className='text-emerald-700' size={13} />
                                                <span className=" text-emerald-700  py-1 ">{lift?.total_purchase_amount}</span>
                                            </div>

                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            {(!isLoading && data?.liftings?.length === 0) && (
                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                    <TableCell
                                        colSpan={8}
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