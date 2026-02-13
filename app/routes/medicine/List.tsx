import { Link } from "react-router";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import {
    Edit,
    IndianRupee,
    PlusIcon,
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import SmallLoading from "@/components/ui/smallLoading";
import { useGetMedicineListQuery } from "@/query/Medicine.queries";

const List = () => {

    const { data, isLoading } = useGetMedicineListQuery();


    return (
        <>
            <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                            Medicine  List
                        </h2>
                        <p className="text-slate-500 dark:text-slate-300 text-sm mt-1">
                            Manage and monitor all medicine delivered across locations.
                        </p>
                    </div>
                    <Link
                        to={"/medicine/delivery"}
                        className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
                    >
                        <PlusIcon />
                        Make Delivery
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
                <div className="space-y-6">

                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto @container">
                            <div className="overflow-x-auto @container">
                                <Table className="w-full text-left border-collapse">
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                Name
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider min-w-50 text-center">
                                                Stock
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider min-w-50 text-center">
                                                Availblity
                                            </TableHead>

                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {
                                            isLoading && (
                                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <TableCell className="px-6 py-4 text-center" colSpan={6}>
                                                        <SmallLoading />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                        {
                                            !isLoading && data?.medicines?.length > 0 && (
                                                data?.medicines?.map((list: any) => (
                                                    <TableRow key={list.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                                                        <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                            {list?.name}
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-center">
                                                            {list?.stock} <sup>Qty</sup>
                                                        </TableCell>
                                                        <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium text-center">

                                                            <div className="flex w-fit items-center gap-2 justify-center mx-auto">
                                                                <div className=" bg-gray-300 relative w-37.5 h-1.25 rounded-full mx-auto mt-1 flex justify-baseline">
                                                                    <span className={`${list?.stock_percentage >= 50 ? 'bg-green-500' : 'bg-red-500'} absolute transition duration-300 ease-in-out start-0 h-full rounded-full`} style={{ width: `${list?.stock_percentage}%` }}>
                                                                    </span>
                                                                </div>
                                                                <span className="text-xs text-slate-500 dark:text-slate-400">{Number(list?.stock_percentage).toFixed(0)}%</span>

                                                            </div>

                                                        </TableCell>
                                                        <TableCell className="flex items-center justify-center gap-1.5">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Link
                                                                        to={`/medicine/${list?.id}/edit`}
                                                                        className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10"
                                                                    >
                                                                        <Edit className="size-5" />
                                                                    </Link>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Update</TooltipContent>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>

                                                ))
                                            )
                                        }
                                        {
                                            !isLoading && data?.length === 0 && (
                                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <TableCell className="px-6 py-4 text-center" colSpan={6}>
                                                        No data available
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default List;
