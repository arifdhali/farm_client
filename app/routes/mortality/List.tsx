import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SmallLoading from "@/components/ui/smallLoading";
import { useGetMoralityListQuery } from "@/query/Mortality.queries";

const List = () => {
    let { data: mortalities, isLoading } = useGetMoralityListQuery();

    return (
        <div className="flex flex-col gap-6">
            <div className=" rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                            Mortality Tracking
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Monitor and log livestock mortality records across all farm sites.
                        </p>
                    </div>
                    <Link
                        to={"/mortality/add"}
                        className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
                    >
                        <PlusIcon />
                        Add Mortality
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#dbdee6] dark:border-gray-800 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[#616b89] text-sm font-semibold uppercase tracking-wider mb-2">
                            Total Mortality (Monthly)
                        </p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-3xl font-black text-primary">
                                {mortalities?.total_mortality && Number(mortalities?.total_mortality).toLocaleString("en-IN", {
                                    minimumFractionDigits: 0,
                                })}
                            </h3>
                            <i className="text-green-500 text-sm font-bold pb-1 flex items-center">
                               Mortality: {mortalities?.percentage?.mortality_percentage}%
                            </i>
                        </div>
                    </div>

                    <div>

                        <img src={'/chicks-dead.gif'} className="mx-auto rounded-2xl mt-3" />
                    </div>
                    <div className="pt-6  dark:border-gray-800">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-500">Survival Rate</span>
                            <span className="font-bold text-primary">98.4%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div
                                className={`bg-primary transition-all duration-500 h-full w-[${mortalities?.percentage?.survival_percentage}%]`}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#dbdee6] dark:border-gray-800 shadow-sm">
                    <h4 className="font-bold text-lg  mb-6">
                        Mortality Rate (Last 30 Days)
                    </h4>
                    <div className="h-48 w-full relative">
                        <div className="absolute inset-0 flex items-end justify-between px-2">
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[20%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[25%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[30%]"></div>
                            <div className="w-[3%] bg-primary/60 rounded-t-sm h-[45%]"></div>
                            <div className="w-[3%] bg-primary rounded-t-sm h-[80%]"></div>
                            <div className="w-[3%] bg-primary/40 rounded-t-sm h-[50%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[30%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[25%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[20%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[15%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[22%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[28%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[35%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[40%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[38%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[30%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[25%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[20%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[18%]"></div>
                            <div className="w-[3%] bg-primary/20 rounded-t-sm h-[25%]"></div>
                        </div>
                        <svg
                            className="absolute inset-0 w-full h-full"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 0 150 Q 50 140, 100 130 T 200 100 T 300 40 T 400 90 T 500 120 T 600 130 T 700 145"
                                fill="none"
                                stroke="#2b5bee"
                                strokeWidth="3"
                            ></path>
                        </svg>
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2">
                        <span>Oct 01</span>
                        <span>Oct 10</span>
                        <span>Oct 20</span>
                        <span>Oct 30</span>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdee6] dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h4 className="font-bold text-lg">Recent Mortality Records</h4>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="text-xs font-medium">Disease</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                            <span className="text-xs font-medium">Heat</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                            <span className="text-xs font-medium">Natural</span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto @container">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                                    Order id
                                </TableHead>
                                <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                                    Farm Name
                                </TableHead>
                                <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                                    Date
                                </TableHead>
                                <TableHead className=" px-6 py-4 text-xs font-bold uppercase text-center">
                                    Number of Birds
                                </TableHead>
                                <TableHead className=" px-6 py-4 text-xs font-bold uppercase">
                                    Reason
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {isLoading && (
                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                    <TableCell colSpan={6} className="px-6 py-4 text-center">
                                        <SmallLoading />
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isLoading &&
                                mortalities?.mortality.length > 0 &&
                                mortalities?.mortality.map((mortal: any) => (
                                    <TableRow
                                        key={mortal.id}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <TableCell className="px-6 py-4 text-sm hidden md:table-cell">
                                            {mortal?.batch_id}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium">
                                            {mortal?.farm?.name}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm font-medium">
                                            {mortal?.incident_date}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-medium text-center">
                                            {mortal?.total_mortality}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm font-medium">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${mortal?.total_quantity === 0
                                                    ? "bg-gray-100 text-gray-600"
                                                    : mortal?.total_quantity <= 10
                                                        ? "bg-blue-100 text-blue-700"
                                                        : mortal?.total_quantity <= 30
                                                            ? "bg-orange-100 text-orange-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {mortal?.reason}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {!isLoading && mortalities?.mortality?.length === 0 && (
                                <TableRow className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                    <TableCell colSpan={6} className="px-6 py-4 text-center">
                                        No records
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default List;
