import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { IndianRupee, PlusIcon } from "lucide-react";


import SmallLoading from "@/components/ui/smallLoading";
import { useGetCashList } from "@/query/Cash.queries";
import HeaderFilter from "@/components/ui/headerFilter";
import { useCallback, useMemo, useState } from "react";
import CustomPagination from "@/components/ui/CustomPagination";

const List = () => {
  const [filter, setFilter] = useState({
    per_page: 10,
    page: 1,
  });
  const { data, isLoading } = useGetCashList(filter);
  const hideFilter = useMemo(() => ({ from: false, to: false, input: true }), []);
  const handlePaginationChange = useCallback((newpage: number) => setFilter((prev) => ({ ...prev, page: newpage })), [])

  return (
    <>
      <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
              Expense Listing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              See specific date informations and monitor all registered expenses across locations.
            </p>
          </div>
          <Link
            to={"/cash/add"}
            className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <PlusIcon />
            Add Expense
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
        <div className="space-y-6">
          <HeaderFilter setValue={setFilter} hide={hideFilter} />

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto @container">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                      Date
                    </TableHead>
                    <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                      Expense Type
                    </TableHead>
                    <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                      Amount
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
                  {!isLoading && data?.expenses?.length > 0 && (
                    data?.expenses.map((expense: any) => (
                      <TableRow
                        key={expense.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                          {expense?.date}
                        </TableCell>

                        <TableCell className="px-6 py-4 text-sm font-medium">
                          {expense?.expenses_type}
                        </TableCell>

                        <TableCell className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center">
                            <IndianRupee className="mt-[2px]" size={15} />
                            {expense?.amount}
                          </div>
                        </TableCell>

                      </TableRow>
                    ))
                  )}
                  {(!isLoading && data?.expenses?.length === 0) && (
                    <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <TableCell
                        colSpan={6}
                        className="px-6 py-4 text-center"
                      >
                        No records
                      </TableCell>
                    </TableRow>
                  )}



                  {
                    data?.current_month_expenses > 0 && (
                      <TableRow
                        className="bg-blue-50/80 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <TableCell className="px-6 py-4 font-bold text-base">
                          Total Expenses
                        </TableCell>
                        <TableCell className="px-6 py-4 font-bold">

                        </TableCell>
                        <TableCell className="px-6 py-4 font-bold text-emerald-600">
                          <div className="flex items-center">
                            <IndianRupee className="mt-[2px]" size={15} />
                            {Number(data?.current_month_expenses).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  }


                </TableBody>
              </Table>
            </div>
            {
              data?.total_expenses > filter.per_page && (
                <CustomPagination
                  total={data?.total_expenses}
                  page={filter.page}
                  per_page={filter.per_page}
                  onPageChange={handlePaginationChange}
                />
              )
            }
          </div>
        </div>
      </div>

    </>
  );
};

export default List;
