import React from 'react'
import { Input } from '../ui/input'
import { BellIcon, Hamburger, MenuSquareIcon, Settings } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getMeQuery } from '@/query/Auth.queries'

const Header = () => {
  const { data: user } = useQuery(getMeQuery());
  return (
    <header className="h-16 bg-white dark:bg-[#1a1630] border-b border-[#dddbe6] dark:border-white/10 flex items-center justify-between px-6 sticky top-0 z-10">

      <SidebarTrigger className="bg-primary text-white p-1 rounded-lg" >
        <MenuSquareIcon />
      </SidebarTrigger>

      <div className="flex items-center gap-4">
        <button className="size-10 flex items-center justify-center rounded-lg bg-light dark:bg-white/5 text-[#121118] dark:text-white hover:bg-gray-200 dark:hover:bg-white/10">
          <BellIcon />
        </button>
        <Link to="/settings" className="size-10 flex items-center justify-center rounded-lg bg-light dark:bg-white/5 text-[#121118] dark:text-white hover:bg-gray-200 dark:hover:bg-white/10">
          <Settings />
        </Link>
        <div className="h-8 w-px bg-[#dddbe6] dark:bg-white/10 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-bold leading-none text-black">{user?.name}</p>
            <p className="text-xs text-[#686189] mt-1 capitalize">{user?.role?.name}</p>
          </div>
          <div className="size-10 rounded-full bg-cover bg-center border-2 border-primary/20" data-alt="Profile picture of farm manager" style={{ backgroundImage: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuA3v0VPsFgqfJKw_LRq3ZKBb9czTVSDu5N-waOPxmX9ul6d43L_fbp4xkE4_n2OsmrA6z4S0hpR2ClNn_4Sj8RPa6T8IL8UDkN32KzvwDVMEMzF9jRX34Tzrh70TbA9o2kAghkD-1x-E0uvbCF8pfiz2VvUwxjmrH_NQFtKyxFyqZNj-xjDnBMi2sIm8gzmwEE8bg_WWRjfdVNvBNwNTMvN8PfK6OLvOYK4XrvMZwvo0z4qDHO4OqaUNRjc0m4HOahjv-pYZfcokLSU)" }}></div>
        </div>
      </div>
    </header>
  )
}

export default Header