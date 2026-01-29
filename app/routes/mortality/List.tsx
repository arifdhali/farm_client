import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const List = () => {
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
                        <p className="text-[#616b89] text-sm font-semibold uppercase tracking-wider mb-2">Total Mortality (Month)</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-4xl font-black">1,248</h3>
                            <p className="text-green-500 text-sm font-bold pb-1 flex items-center">
                                <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                4.2%
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">v.s. 1,303 birds last month</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-500">Survival Rate</span>
                            <span className="font-bold text-primary">98.4%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[98.4%]"></div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#dbdee6] dark:border-gray-800 shadow-sm">
                    <h4 className="font-bold text-lg  mb-6">Mortality Rate (Last 30 Days)</h4>
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
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            <path d="M 0 150 Q 50 140, 100 130 T 200 100 T 300 40 T 400 90 T 500 120 T 600 130 T 700 145" fill="none" stroke="#2b5bee" strokeWidth="3"></path>
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
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Farm Name</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Number of Birds</th>
                                <th className="px-6 py-4">Reason</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <tr className="hover:bg-primary/5 transition-colors group">
                                <td className="px-6 py-4 font-semibold text-sm">North Wing Poultry - Barn A</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 28, 2023</td>
                                <td className="px-6 py-4 text-sm text-center font-bold">14</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700 uppercase">Heat Stress</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary/5 transition-colors group">
                                <td className="px-6 py-4 font-semibold text-sm">East Valley Range</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 27, 2023</td>
                                <td className="px-6 py-4 text-sm text-center font-bold">42</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700 uppercase">Disease (Viral)</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary/5 transition-colors group">
                                <td className="px-6 py-4 font-semibold text-sm">Central Hub - Broiler 2</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 27, 2023</td>
                                <td className="px-6 py-4 text-sm text-center font-bold">08</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 uppercase">Natural Causes</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary/5 transition-colors group">
                                <td className="px-6 py-4 font-semibold text-sm">North Wing Poultry - Barn B</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 26, 2023</td>
                                <td className="px-6 py-4 text-sm text-center font-bold">12</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700 uppercase">Heat Stress</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary/5 transition-colors group">
                                <td className="px-6 py-4 font-semibold text-sm">Southern Flats Outpost</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 25, 2023</td>
                                <td className="px-6 py-4 text-sm text-center font-bold">05</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 uppercase">Natural Causes</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-500">Showing 5 of 128 entries</span>
                    <div className="flex gap-1">
                        <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold disabled:opacity-50">Previous</button>
                        <button className="p-2 px-3 rounded-lg bg-primary text-white text-xs font-bold">1</button>
                        <button className="p-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold">2</button>
                        <button className="p-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold">3</button>
                        <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
