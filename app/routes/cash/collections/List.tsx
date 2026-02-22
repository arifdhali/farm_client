import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Edit, IndianRupee, PlusIcon, Trash, TrashIcon } from "lucide-react";


import SmallLoading from "@/components/ui/smallLoading";
import { useGetCollectionsList } from "@/query/Cash.queries";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
const List = () => {

  const { data, isLoading } = useGetCollectionsList();

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
                    
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase text-center">
                        Customer Name
                      </TableHead>
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                        Shop name
                      </TableHead>
                      <TableHead className=" px-6 py-4 text-xs font-bold uppercase text-center">
                        Due Amount
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
                            colSpan={6}
                            className="px-6 py-4 text-center"
                          >
                            <SmallLoading />
                          </TableCell>
                        </TableRow>

                      )
                    }
                    {!isLoading && data?.payments?.length > 0 && (
                      data?.payments.map((collection: any, index:number) => (
                        <TableRow
                          key={index}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                            {collection?.date ? format(new Date(collection.date), "dd/MM/yyyy") : ""}
                          </TableCell>

                       
                          <TableCell className="px-6 py-4 text-sm font-medium capitalize text-center">

                            {collection?.customer?.name}
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm font-medium">
                            {collection?.customer?.shopname}
                          </TableCell>


                          <TableCell className="px-6 py-4 text-sm font-medium">
                            <div className="flex items-center justify-center text-red-500">
                              <IndianRupee size={14} />  {collection?.balance}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-sm font-medium">

                            <div className="flex items-center justify-center gap-1.5">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    to={`/cash/collection/${collection?.customer_id}/edit`}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10"
                                  >
                                    <Edit className="size-5" />
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
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

    </>
  );
};

export default List;
