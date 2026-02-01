import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Search } from "lucide-react";

const HeaderFilter = () => {
  return (
    <>
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200  dark:border-slate-800 flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 " />
          <Input
            placeholder="Search by farmer name, address or mobile..."
            className="pl-11 h-11 shadow-none"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-44 h-11  justify-between shadow-none font-normal border border-slate-200 bg-white text-slate-400"
            >
              From date
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-75 bg-white p-0 border-0 ">
            <Calendar mode="single" className="w-full calender" />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-44 h-11 justify-between font-normal border  border-slate-200 bg-white text-slate-400 shadow-none"
            >
              To date
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-75 bg-white p-0 border-0">
            <Calendar mode="single" className="w-full calender" />
          </PopoverContent>
        </Popover>

        <Select defaultValue="10">
          <SelectTrigger className="w-36 min-h-11  border border-slate-200 bg-white text-slate-400 shadow-none">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>

          <SelectContent className="bg-white border-0">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default HeaderFilter;
