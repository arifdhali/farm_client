import { useState } from "react";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogFooter, AlertDialogHeader,
} from "@/components/ui/alert-dialog";

import { Birdhouse, CheckIcon, EyeIcon, PlusIcon, TrashIcon, } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { useGetLiftingList } from "@/query/Farm.queries";
import SmallLoading from "@/components/ui/smallLoading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const Lifting = () => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [status, setStatus] = useState("started")
    const { data: lifting, isLoading } = useGetLiftingList({ status });
    const [makeComplete, setMakeComplete] = useState<any>();
    const handleMakeComplete = (id: number): void => {
        let order = lifting?.data?.find((o: any) => o.active_batch_id == id);
        setMakeComplete(order);
        setOpenAlert(!openAlert);
    };
    return (
        <>
            <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                            All Lifting
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Manage and monitor all lifting poultry farmers across locations.
                        </p>
                    </div>

                    <Link
                        to={"/farms/lifting/add"}
                        className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
                    >
                        <PlusIcon />
                        Make Lifting
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden ">
                        <Tabs defaultValue="started" onValueChange={(value: string) => setStatus(value)} className="w-full p-4">
                            <TabsList>
                                <TabsTrigger
                                    value="started"
                                    className="h-fit px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-blue-100"
                                >
                                    Started
                                </TabsTrigger>

                                <TabsTrigger
                                    value="complete"
                                    className="h-fit px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-blue-100"
                                >
                                    Completed
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="started">
                                <div className="overflow-x-auto @container">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                                                    ID
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                                                    Farmer Name
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase hidden md:table-cell">
                                                    Mobile
                                                </TableHead>

                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                                    Available Chicks
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                                    Lifting Status
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {isLoading && (
                                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                                    <TableCell
                                                        colSpan={6}
                                                        className="px-6 py-4 text-center"
                                                    >
                                                        <SmallLoading />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {!isLoading &&
                                                lifting?.data?.length > 0 &&
                                                lifting?.data?.map((lift: any) => (
                                                    <TableRow
                                                        key={lift?.id}
                                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                                                    >
                                                        <TableCell className="px-6 py-4 text-sm font-medium ">
                                                            {lift?.active_batch_id}
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className="size-10 rounded-full bg-cover bg-center"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9NG1Kb7xNEXdiDP4alp3ILUnFLgQqDDlgXErXBuOCYtf3Mk2B9vdq8ImXv8JZT0H8wKfNMmqTXEUWMdIXWgWtrfbcESOyYZ3NRtHgAiDJhylsJU2ZqmyaEEgDwQBB1qWpmW5XiSBAtMEd2F0s3wMZfr3VAy5opTKAjlMC8z1UOxob6h-1s8f7gZk9BIEtqjmaYjaTcrf_RDzIX-ITM0-pVi-61xgH1sTdmQkc1ZbwRiuDxRC0PAkPl8jsj71noHlgCzvn0jmPXDW0')",
                                                                    }}
                                                                />
                                                                <span className="font-semibold text-sm">
                                                                    {lift?.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-sm font-medium ">
                                                            {lift?.mobile_number}
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                                            {lift?.available_chicks} birds
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-center">
                                                            <span
                                                                className={`capitalize inline-flex justify-center items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400`}
                                                            >
                                                                <span
                                                                    className={`w-1 h-1 rounded-full mr-1.5 bg-yellow-500 `}
                                                                />
                                                                {lift?.lifting_status}
                                                            </span>
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4">
                                                            <div className="flex items-center justify-center gap-1.5">

                                                                {lift?.lifting_status != "complete" && (
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <button
                                                                                onClick={() => handleMakeComplete(lift?.active_batch_id)}
                                                                                className="cursor-pointer p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                                                                            >
                                                                                <CheckIcon className="text-green-500" />
                                                                            </button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            Make Complete
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                            {!isLoading && lifting?.data?.length === 0 && (
                                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                                    <TableCell
                                                        colSpan={6}
                                                        className="px-6 py-4 text-center"
                                                    >
                                                        No records
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                            <TabsContent value="complete">

                                <div className="overflow-x-auto @container">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                                                    compilation  Date
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                                                    ORder id
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                                                    Farmer Name
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                                    Lifted weight
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                                    Lifted Chicks
                                                </TableHead>

                                                <TableHead className="px-6 py-4 text-xs font-bold uppercase text-center">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {isLoading && (
                                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                                    <TableCell
                                                        colSpan={6}
                                                        className="px-6 py-4 text-center"
                                                    >
                                                        <SmallLoading />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {!isLoading &&
                                                lifting?.data?.length > 0 &&
                                                lifting?.data?.map((lift: any) => (
                                                    <TableRow
                                                        key={lift?.id}
                                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                                                    >
                                                        <TableCell className="px-6 py-4">
                                                            {lift?.lifted_date && format(new Date(lift?.lifted_date), "dd/MM/yyyy")}
                                                        </TableCell>
                                                        <TableCell className="px-6 py-4 text-sm font-medium ">
                                                            {lift?.batch_id}
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className="size-10 rounded-full bg-cover bg-center"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9NG1Kb7xNEXdiDP4alp3ILUnFLgQqDDlgXErXBuOCYtf3Mk2B9vdq8ImXv8JZT0H8wKfNMmqTXEUWMdIXWgWtrfbcESOyYZ3NRtHgAiDJhylsJU2ZqmyaEEgDwQBB1qWpmW5XiSBAtMEd2F0s3wMZfr3VAy5opTKAjlMC8z1UOxob6h-1s8f7gZk9BIEtqjmaYjaTcrf_RDzIX-ITM0-pVi-61xgH1sTdmQkc1ZbwRiuDxRC0PAkPl8jsj71noHlgCzvn0jmPXDW0')",
                                                                    }}
                                                                />
                                                                <span className="font-semibold text-sm">
                                                                    {lift?.farmer_name}
                                                                </span>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                                            {lift?.total_weight} <sup>Kg</sup>
                                                        </TableCell>

                                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                                            {lift?.total_chicks}
                                                        </TableCell>



                                                        <TableCell className="px-6 py-4">
                                                            <div className="flex items-center justify-center gap-1.5">
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Link
                                                                            to={`/farms/lifting/${lift?.farmer_id}?order_id=${lift?.batch_id}`}
                                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10"
                                                                        >
                                                                            <EyeIcon className="size-5" />
                                                                        </Link>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>View</TooltipContent>
                                                                </Tooltip>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                            {!isLoading && lifting?.data?.length === 0 && (
                                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                                    <TableCell
                                                        colSpan={6}
                                                        className="px-6 py-4 text-center"
                                                    >
                                                        No records
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent className="p-8 w-110 border-0 items-center">
                    <div className={`mx-auto p-4 w-fit flex items-center justify-center bg-primary rounded-full`}>
                        <Birdhouse className="text-white" />
                    </div>
                    <AlertDialogHeader className="mb-8 mt-4 items-center">
                        <AlertDialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                            Mark As Complete
                        </AlertDialogTitle>


                        <AlertDialogDescription className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-3 text-center">
                            {makeComplete?.available_chicks > 0 ? (
                                <>
                                    This farm{" "}
                                    <strong className="font-semibold text-slate-900 dark:text-white">
                                        {makeComplete?.name}
                                    </strong>{" "}
                                    still has{" "}
                                    <strong className="font-semibold text-red-600">
                                        {makeComplete?.available_chicks} chicks
                                    </strong>{" "}
                                    remaining.

                                    Please lift all chicks before marking it as complete.
                                </>
                            ) : (
                                <>
                                    Are you sure you want to mark{" "}
                                    <strong className="font-semibold text-slate-900 dark:text-white">
                                        {makeComplete?.name}
                                    </strong>{" "}
                                    as complete?

                                    This action cannot be undone.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="grid grid-cols-2 gap-4">
                        <AlertDialogCancel className="flex items-center justify-center rounded-lg h-12 bg-gray-200 dark:bg-[#3a1d1d] text-[#181111] dark:text-white hover:text-white border-0 text-sm font-bold  hover:bg-primary/90 dark:hover:bg-[#4d2727] ">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction disabled={makeComplete?.available_chicks > 0} className="flex items-center justify-center rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90  shadow-lg shadow-primary/20">
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Lifting;
