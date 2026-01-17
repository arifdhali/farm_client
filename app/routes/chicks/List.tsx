import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    DownloadCloudIcon,
    Edit,
    Eye,
    EyeIcon,
    Filter,
    Pencil,
    Plus,
    PlusIcon,
    Search,
    Trash,
    TrashIcon,
    View,
} from "lucide-react";

import type { DateRange } from "react-day-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const List = () => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const handleDelete = (id: number): void => {
        setOpenAlert(!openAlert);
    };
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2025, 5, 12),
        to: new Date(2025, 6, 15),
    });
    return (
        <>
            <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                            Chicks Delivery List
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Manage and monitor all chicks delivered across
                            locations.
                        </p>
                    </div>
                    <Link
                        to={"/chicks/delivery"}
                        className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
                    >
                        <PlusIcon />
                        Make  Delivery
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by farmer name, address or mobile..."
                                className="pl-11 h-11"
                            />
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-44 h-11 justify-between shadow-none font-normal border border-light"
                                >
                                    From date
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="end"
                                className="w-75 bg-white p-0 border-0 "
                            >
                                <Calendar mode="single" className="w-full calender" />
                            </PopoverContent>

                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-44 h-11 justify-between font-normal border border-light shadow-none"
                                >
                                    To date
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="end"
                                className="w-75 bg-white p-0 border-0"
                            >
                                <Calendar mode="single" className="w-full calender" />
                            </PopoverContent>

                        </Popover>

                        <Select defaultValue="10">
                            <SelectTrigger
                                size={"default"}
                                className="w-36 h-[44px] bg-white border border-light shadow-none"
                            >
                                <SelectValue placeholder="Per page" />
                            </SelectTrigger>

                            <SelectContent className="bg-white border-0">
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>


                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto @container">
                            <div className="overflow-x-auto @container">
                                <Table className="w-full text-left border-collapse">
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                ID
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                Farmer Name
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider min-w-[200px]">
                                                Quantity
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                Unit Price
                                            </TableHead>
                                            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {/* ROW */}
                                        <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                                            <TableCell className="px-6 py-4">
                                                <div className=" text-primary">
                                                    SSC-31231232
                                                </div>
                                            </TableCell>

                                            <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                NutriFeed Solutions Ltd
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                1000
                                            </TableCell>

                                            <TableCell className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                $32.50
                                            </TableCell>

                                            <TableCell className="flex items-center justify-end gap-1.5">

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            to="/farms/1/edit"
                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10"
                                                        >
                                                            <Edit className="size-5" />
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Edit</TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={() => handleDelete(1)}
                                                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-100"
                                                        >
                                                            <Trash className="size-5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Delete</TooltipContent>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>

                                        {/* Repeat rows exactly the same */}
                                    </TableBody>
                                </Table>
                            </div>

                        </div>
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Showing 1 to 5 of 42 entries
                            </p>
                            <div className="flex items-center gap-1">
                                <a
                                    className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-400"
                                    href="#"
                                >
                                    <span className="text-[20px]">
                                        <ChevronLeft />
                                    </span>
                                </a>
                                <a
                                    className="text-xs font-bold flex size-9 items-center justify-center text-white rounded-lg bg-primary shadow-sm"
                                    href="#"
                                >
                                    1
                                </a>
                                <a
                                    className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    href="#"
                                >
                                    2
                                </a>
                                <a
                                    className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    href="#"
                                >
                                    3
                                </a>
                                <span className="text-slate-400 px-1">...</span>
                                <a
                                    className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    href="#"
                                >
                                    9
                                </a>
                                <a
                                    className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-400"
                                    href="#"
                                >
                                    <span className="text-[20px]">
                                        <ChevronRight />
                                    </span>
                                </a>
                            </div>
                        </div>
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
