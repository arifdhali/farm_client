import { useState } from "react";
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";

import {
    IndianRupee,
    PlusIcon,
    Trash,
    TrashIcon,
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetDeliveredListQuery } from "@/query/Chicks.queries";
import HeaderFilter from "@/components/ui/headerFilter";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import CustomPagination from "@/components/ui/CustomPagination";

const List = () => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const handleDelete = (id: number): void => {
        setOpenAlert(!openAlert);
    };

    const { data, isLoading } = useGetDeliveredListQuery();
    console.log(data);
    return (
        <>
            <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                            Chicks Delivery List
                        </h2>
                        <p className="text-slate-500 dark:text-slate-300 text-sm mt-1">
                            Manage and monitor all chicks delivered across locations.
                        </p>
                    </div>
                    <Link
                        to={"/chicks/delivery"}
                        className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
                    >
                        <PlusIcon />
                        Make Delivery
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
                <div className="space-y-6">

                    <HeaderFilter />
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto @container">
                            <div className="overflow-x-auto @container">
                                <Table className="w-full text-left border-collapse">
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                Delivered ID
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                Date
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                Farmer Name
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider min-w-[200px] text-center">
                                                Quantity
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                                                Unit Price
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
                                                        <Skeleton className="w-full h-12" />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                        {
                                            data && data.length > 0 ? (
                                                data?.map((list: any) => (
                                                    <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                                                        <TableCell className="px-6 py-4">
                                                            <div className=" text-primary">{list?.delivery_id}</div>
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                            {format(list?.delivery_date, "dd/MM/yyyy")}
                                                        </TableCell>
                                                        <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                            {list?.farm?.name}
                                                        </TableCell>
                                                        <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium text-center">
                                                            {list?.total_delivered}
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white text-center">
                                                            <div className="flex items-center justify-center">
                                                                <IndianRupee size={14} /> {list?.chicks_rate}
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="flex items-center justify-center gap-1.5">

                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <button
                                                                        onClick={() => handleDelete(list?.id)}
                                                                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-100"
                                                                    >
                                                                        <Trash className="size-5" />
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Delete</TooltipContent>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>

                                                ))
                                            ) : (
                                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <TableCell className="px-6 py-4 text-center" colSpan={6}>
                                                        No data available
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }


                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <CustomPagination />

                    </div>
                </div>
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent className="p-8 w-110 border-0 items-center">
                    <div className="mx-auto p-4 w-fit flex items-center justify-center bg-red-600 rounded-full">
                        <TrashIcon className="text-white" />
                    </div>
                    <AlertDialogHeader className="mb-8 mt-4 items-center">
                        <AlertDialogTitle className="text-2xl font-bold text-[#181111] dark:text-white leading-tight">
                            Delete Farmer?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[#896161] text-sm leading-relaxed mt-3 text-center">
                            Are you sure you want to delete{" "}
                            <strong className="font-semibold text-black">Jane Smith</strong>?
                            This action cannot be undone and all associated records will be
                            lost.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="grid grid-cols-2 gap-4">
                        <AlertDialogCancel className="flex items-center justify-center rounded-lg h-12 bg-gray-200 dark:bg-[#3a1d1d] text-[#181111] dark:text-white hover:text-white border-0 text-sm font-bold  hover:bg-primary/90 dark:hover:bg-[#4d2727] ">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="flex items-center justify-center rounded-lg h-12 bg-red-600 text-white text-sm font-bold hover:bg-primary/90  shadow-lg shadow-primary/20">
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default List;
