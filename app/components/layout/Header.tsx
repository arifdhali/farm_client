import React from 'react'
import { Input } from '../ui/input'

const Header = () => {
  return (
    
      <header
        className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2
              className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight"
            >
              Farmer Listing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage and monitor all registered poultry farmers across
              locations.
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Farmer</span>
          </button>
        </div>
      </header>
  )
}

export default Header