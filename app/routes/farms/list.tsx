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

import { Edit, PlusIcon, Trash, TrashIcon } from "lucide-react";

import type { DateRange } from "react-day-picker";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  useDeleteFarmMutation,
  useGetFarmersList,
} from "@/query/Farm.queries";
import HeaderFilter from "@/components/ui/headerFilter";
import CustomPagination from "@/components/ui/CustomPagination";

const List = () => {
  const { data, isLoading } = useGetFarmersList();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [farm, setfarm] = useState<any>({});

  const deleteMutaion = useDeleteFarmMutation();

  const handleDeleteModal = (id: number): void => {
    let farmName = data?.data?.farms.filter((farm: any) => id == farm.id);
    setfarm({
      id: id,
      name: farmName[0].name,
    });
    setOpenAlert(!openAlert);
  };

  const handleDeleteFarm = () => {
    deleteMutaion.mutate(farm.id);
  };

  return (
    <>
      <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
              Farmer Listing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage and monitor all registered poultry farmers across
              locations.
            </p>
          </div>
          <Link
            to={"/farms/add"}
            className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <PlusIcon />
            Add Farmer
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
        <div className="space-y-6">
          <HeaderFilter />

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto @container">
              <div className="overflow-x-auto @container">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                        Farmer Name
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold uppercase hidden md:table-cell">
                        Address
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                        Mobile Number
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                        Farm Capacity
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold uppercase">
                        Status
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold uppercase text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data?.data?.farms.length >= 1 ? (
                      data?.data?.farms.map((farm: any) => (
                        <TableRow
                          key={farm.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                        >
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
                                {farm?.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                            {farm?.location}
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm font-medium">
                            {farm?.mobile_number}
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm font-medium text-center">
                            {farm?.capacity}
                          </TableCell>

                          <TableCell className="px-6 py-4">
                            {
                              <span
                                className={`flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-bold ${farm?.availablity_status === "free" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                              >
                                <span
                                  className={`w-2 h-2  animate-pulse rounded-full ${farm?.availablity_status === "free" ? "bg-emerald-500" : "bg-yellow-500"} mr-1.5`}
                                ></span>
                                {farm?.availablity_status === "free"
                                  ? "Available"
                                  : "Occupied"}
                              </span>
                            }
                          </TableCell>

                          <TableCell className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    to={`/farms/${farm?.id}/edit`}
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
                                    onClick={() => handleDeleteModal(farm?.id)}
                                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-100"
                                  >
                                    <Trash className="size-5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell
                          colSpan={6}
                          className="px-6 py-4 text-center"
                        >
                          No records
                        </TableCell>
                      </TableRow>
                    )}
                    {/* Repeat rows as-is */}
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
              <strong className="font-semibold text-black">
                {farm && farm.name}
              </strong>
              ? This action cannot be undone and all associated records will be
              lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 gap-4">
            <AlertDialogCancel className="flex items-center justify-center rounded-lg h-12 bg-gray-200 dark:bg-[#3a1d1d] text-[#181111] dark:text-white hover:text-white border-0 text-sm font-bold  hover:bg-primary/90 dark:hover:bg-[#4d2727] ">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutaion.isPending}
              onClick={handleDeleteFarm}
              className="flex items-center justify-center rounded-lg h-12 bg-red-600 text-white text-sm font-bold hover:bg-primary/90  shadow-lg shadow-primary/20"
            >
              {deleteMutaion.isPending ? "Processing" : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default List;
