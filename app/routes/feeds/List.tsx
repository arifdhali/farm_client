import { useState } from "react";
import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

import { Edit, IndianRupee, PlusIcon, Trash, TrashIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDeleteFeedMutation, useGetFeedListQuery, useGetFeedReturnedListQuery } from "@/query/Feed.queries";
import SmallLoading from "@/components/ui/smallLoading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { format } from "date-fns";

const List = () => {

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [status, setStatus] = useState("list");

  const { data: feedslist, isLoading } = useGetFeedListQuery();
  const { data: returnedFeedslist, isLoading: isReturnedLoading } = useGetFeedReturnedListQuery();
  const [feed, setfeed] = useState<any>({});
  const deleteMutatoin = useDeleteFeedMutation();

  const handleDelete = (id: number): void => {
    let selectFeed = feedslist?.feeds?.find((item: any) => item.id === id)
    setfeed({
      id: selectFeed?.id,
      name: selectFeed?.name,
    });
    setOpenAlert(!openAlert);
  };

  const deleteFeed = async () => {
    await deleteMutatoin.mutateAsync(feed.id);
    setOpenAlert(!openAlert);
  }


  return (
    <>
      <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
              Feed List
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage and monitor all registered poultry farmers across
              locations.
            </p>
          </div>
          <Link
            to={status === "list" ? "/feeds/add" : "/feeds/returned"}
            className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <PlusIcon />
            {status === "list" ? "Add Feed" : "Returned Feed"}
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
        <div className="space-y-6">
          {/* <HeaderFilter /> */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">



            <Tabs defaultValue="list" onValueChange={(value: string) => setStatus(value)} className="w-full p-4">
              <TabsList>
                <TabsTrigger
                  value="list"
                  className="h-fit px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-blue-100"
                >
                  List
                </TabsTrigger>

                <TabsTrigger
                  value="returned"
                  className="h-fit px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-blue-100"
                >
                  Returned
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <div className="overflow-x-auto @container">
                  <Table className="w-full text-left border-collapse">
                    <TableHeader>
                      <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                          Date
                        </TableHead>
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                          Feed Type
                        </TableHead>

                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center   min-w-50">
                          Quantity
                        </TableHead>
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center ">
                          Weight
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
                              <SmallLoading />
                            </TableCell>
                          </TableRow>
                        )
                      }

                      {
                        !isLoading && feedslist?.feeds?.length > 0 && (
                          feedslist?.feeds.map((feed: any) => (
                            <TableRow key={feed.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">


                              <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                {format(new Date(feed?.delivery_date), "dd/MM/yyyy")}
                              </TableCell>
                              <TableCell className="px-6 py-4">
                                <div className="flex gap-2 items-center ">

                                  <span className="size-2 rounded-full bg-emerald-500"></span>
                                  <span className="font-semibold text-sm capitalize">{feed?.feed_type}</span>
                                </div>
                              </TableCell>

                              <TableCell className="px-6 py-4 text-center">
                                {feed?.quantity}
                              </TableCell>

                              <TableCell className="px-6 text-center py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                {feed?.weight} <sup className="">Kg</sup>
                              </TableCell>

                              <TableCell className="px-6 py-4 text-sm text-center font-medium text-slate-900 dark:text-white">

                                <div className="flex items-center justify-center">
                                  <IndianRupee size={14} />  {feed?.rate}
                                </div>
                              </TableCell>

                              <TableCell className="flex items-center justify-center gap-1.5">

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link
                                      to={`/feeds/${feed?.id}/edit`}
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
                                      onClick={() => handleDelete(feed?.id)}
                                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-100"
                                    >
                                      <Trash className="size-5" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent >Delete</TooltipContent>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          )))
                      }

                      {
                        !isLoading && feedslist?.feeds?.length == 0 && (
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
              </TabsContent>
              <TabsContent value="returned">
                <div className="overflow-x-auto @container">
                  <Table className="w-full text-left border-collapse">
                    <TableHeader>
                      <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                          Date
                        </TableHead>
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                          Batch Id
                        </TableHead>
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                          Farm name
                        </TableHead>
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                          Feed Type
                        </TableHead>

                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center   min-w-50">
                          Quantity
                        </TableHead>
                        <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center ">
                          Weight
                        </TableHead>


                      </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">

                      {
                        isReturnedLoading && (
                          <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                            <TableCell className="px-6 py-4 text-center" colSpan={6}>
                              <SmallLoading />
                            </TableCell>
                          </TableRow>
                        )
                      }

                      {
                        !isReturnedLoading && returnedFeedslist?.length > 0 && (
                          returnedFeedslist?.map((feed: any) => (
                            <TableRow key={feed.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">


                              <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                {format(new Date(feed?.returned_date), "dd/MM/yyyy")}
                              </TableCell>
                              <TableCell className="px-6 py-4">
                                {feed?.batch_id}
                              </TableCell>
                              <TableCell className="px-6 py-4 ">
                                {feed?.farm?.name}
                              </TableCell>
                              <TableCell className="px-6 py-4">
                                <div className="flex gap-2 items-center ">

                                  <span className="size-2 rounded-full bg-emerald-500"></span>
                                  <span className="font-semibold text-sm capitalize">{feed?.feed?.feed_type}</span>
                                </div>
                              </TableCell>

                              <TableCell className="px-6 py-4 text-center">
                                {feed?.quantity}
                              </TableCell>

                              <TableCell className="px-6 text-center py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                {feed?.weight} <sup className="">Kg</sup>
                              </TableCell>
                            </TableRow>
                          )))
                      }

                      {
                        !isReturnedLoading && returnedFeedslist?.length == 0 && (
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

              </TabsContent>
            </Tabs>
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
              Delete Feed?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#896161] text-sm leading-relaxed mt-3 text-center">
              Are you sure you want to delete{" "}
              <strong className="font-semibold text-black">{feed.name}</strong>?
              This action cannot be undone and all associated records will be
              lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 gap-4">
            <AlertDialogCancel className="flex items-center justify-center rounded-lg h-12 bg-gray-200 dark:bg-[#3a1d1d] text-[#181111] dark:text-white hover:text-white border-0 text-sm font-bold  hover:bg-primary/90 dark:hover:bg-[#4d2727] ">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteFeed} className="flex items-center justify-center rounded-lg h-12 bg-red-600 text-white text-sm font-bold hover:bg-primary/90  shadow-lg shadow-primary/20">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default List;
