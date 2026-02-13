import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Edit, IndianRupee, PlusIcon, Trash, TrashIcon } from "lucide-react";


import SmallLoading from "@/components/ui/smallLoading";
import { useGetCollectionsist } from "@/query/Cash.queries";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
import { useState } from "react";
const List = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { data, isLoading } = useGetCollectionsist();

  return (
    <>
      <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
              Collections Listing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage and monitor all registered collections across locations.
            </p>
          </div>
          <Link
            to={"/cash/collection/add"}
            className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <PlusIcon />
            New Collection
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
        <div className="space-y-6">

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto @container">
              <div className="overflow-x-auto @container">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                        Date
                      </TableHead>
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                        Order id
                      </TableHead>
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase text-center">
                        Payment Type
                      </TableHead>
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                        Shop name
                      </TableHead>
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase text-center">
                        Balanced Amount
                      </TableHead>
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase text-center">
                        Actions
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
                    {!isLoading && data?.payments?.length > 0 && (
                      data?.payments.map((collection: any) => (
                        <TableRow
                          key={collection.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                            {collection?.date ? format(new Date(collection.date), "dd/MM/yyyy") : ""}
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm font-medium capitalize">

                            {collection?.farm_lifting?.batch_id}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-sm font-medium capitalize text-center">

                            {collection?.payment_type}
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm font-medium">
                            {collection?.customer?.shopname}
                          </TableCell>


                          <TableCell className="px-6 py-4 text-sm font-medium">
                            <div className="flex items-center justify-center text-red-500">
                              <IndianRupee size={14} />  {collection?.balanced_amount}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-sm font-medium">

                            <div className="flex items-center justify-center gap-1.5">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    to={`/cash/collection/${collection?.id}/edit`}
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
                                    // onClick={() => handleDeleteModal(farm?.id)}
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
                    )}
                    {(!isLoading && data?.payments?.length === 0) && (
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
            </div>
          </div>
        </div>
      </div >


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
                {/* {farm && farm.name} */}
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
              // disabled={deleteMutaion.isPending}
              // onClick={handleDeleteFarm}
              className="flex items-center justify-center rounded-lg h-12 bg-red-600 text-white text-sm font-bold hover:bg-primary/90  shadow-lg shadow-primary/20"
            >
              {/* {deleteMutaion.isPending ? "Processing" : "Confirm"} */}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default List;
