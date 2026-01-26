import React from 'react'

const Settings = () => {
    return (

        <section className="px-6 md:px-12 pb-12 flex justify-center lg:justify-start">

            <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Update Password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <form className="space-y-6">

                    <div className="flex flex-col gap-2">
                        <label className="text-[#121118] dark:text-gray-200 text-sm font-semibold">Email Address</label>
                        <input className="form-input flex w-full rounded-lg text-[#121118] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dddbe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 text-base font-normal leading-normal transition-all" type="email" value="alex.miller@farm-management.com" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#121118] dark:text-gray-200 text-sm font-semibold">Current Password</label>
                        <div className="relative flex items-center">
                            <input className="form-input flex w-full rounded-lg text-[#121118] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dddbe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 pr-12 text-base font-normal leading-normal transition-all" placeholder="••••••••" type="password" />
                            <button className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center" type="button">
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#121118] dark:text-gray-200 text-sm font-semibold">New Password</label>
                        <div className="relative flex items-center">
                            <input className="form-input flex w-full rounded-lg text-[#121118] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dddbe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 pr-12 text-base font-normal leading-normal transition-all" placeholder="Min. 8 characters" type="password" />
                            <button className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center" type="button">
                                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                            </button>
                        </div>

                        <div className="mt-2 space-y-2">
                            <div className="flex gap-1 h-1.5 w-full">
                                <div className="flex-1 rounded-full bg-primary"></div>
                                <div className="flex-1 rounded-full bg-primary"></div>
                                <div className="flex-1 rounded-full bg-primary"></div>
                                <div className="flex-1 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <p className="text-xs text-primary font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Strength: Strong
                            </p>
                        </div>
                    </div>
                    <div className="pt-6 flex flex-col sm:flex-row gap-3">
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm" type="submit">
                            Update Security Settings
                        </button>
                        <button className="bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold text-sm transition-all" type="button">
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <span className="material-symbols-outlined">authenticator</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Two-factor Authentication</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                            </div>
                        </div>
                        <button className="text-primary text-sm font-bold hover:underline">Enable</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings