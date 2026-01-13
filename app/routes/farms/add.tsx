import { ArrowLeftIcon, ArrowLeftToLineIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const add = () => {
    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6">
                <div className="flex flex-wrap justify-between items-end gap-3">
                    <div className="flex flex-col ">
                        <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">Add New Farmer</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">Register a new farmer and their livestock capacity to the system.</p>
                    </div>
                    <Link to={"/farms/list"} className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">

                        <ArrowLeftIcon />
                        Back to List
                    </Link>
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <form className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">Farmer Name</label>
                            <input className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary/20 focus:border-primary px-4 py-3 text-base" placeholder="Enter full name" type="text" />
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">Mobile Number</label>
                            <input className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary/20 focus:border-primary px-4 py-3 text-base" placeholder="+1 234 567 890" type="tel" />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">Farm Address</label>
                            <textarea className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary/20 focus:border-primary px-4 py-3 text-base min-h-25" placeholder="Enter physical farm address"></textarea>
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">Farm Capacity</label>
                            <input className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary/20 focus:border-primary px-4 py-3 text-base" placeholder="e.g. 5000 birds" type="text" />
                        </div>
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">Farm Status</label>
                            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg w-full max-w-xs">
                                <button className="flex-1 py-2 px-3 rounded-md text-sm font-bold bg-white dark:bg-zinc-700 text-primary shadow-sm border border-zinc-200 dark:border-zinc-600 transition-all" type="button">Free</button>
                                <button className="flex-1 py-2 px-3 rounded-md text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 transition-all" type="button">Occupied</button>
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-4">
                        <button className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors" type="button">
                            Cancel
                        </button>
                        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all" type="submit">
                            Add Farmer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default add
