import React, { memo, useState } from "react";
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
import { format } from "date-fns";

const HeaderFilter = ({ setValue, hide }: { setValue: any, hide: any }) => {
  const { to = false, from = false, input = false } = hide;
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-4 items-center">

        {/* Search */}
        {
          !input && (
            < div className="relative flex-1 ">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4  text-slate-400" />
              <Input
                onChange={(v) =>
                  setValue((prev: any) => ({ ...prev, search: v.target.value }))
                }
                placeholder="Search by name.."
                className="pl-11 h-11 shadow-none w-full"
              />
            </div>
          )
        }

        <div className="flex-1">
          <div className="flex items-center gap-3">

            {!from && (
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 px-4 w-1/3 justify-between shadow-none font-normal border border-slate-200 bg-white text-slate-400 whitespace-nowrap"
                  >
                    {
                      fromDate ? format(fromDate, "dd/MM/yyyy") : 'From date'
                    }
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="bg-white p-0 border-0">
                  <Calendar mode="single" className="w-full calender"
                    selected={fromDate}
                    onSelect={(date) => {
                      if (!date) return;
                      setFromDate(date);
                      setValue((prev: any) => ({
                        ...prev,
                        from_date: format(date, "yyyy-MM-dd"),
                        page: 1
                      }));
                      setOpenFrom(!fromDate)
                    }} />
                </PopoverContent>
              </Popover>
            )}

            {!to && (
              <Popover open={openTo} onOpenChange={setOpenTo}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 w-1/3 px-4 justify-between font-normal border border-slate-200 bg-white text-slate-400 shadow-none whitespace-nowrap"
                  >
                    {
                      toDate ? format(toDate, "dd/MM/yyyy") : ' To date'
                    }
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="bg-white p-0 border-0">
                  <Calendar mode="single" className="w-full calender"
                    selected={toDate}
                    disabled={(date) => fromDate ? date < fromDate : false}
                    onSelect={(date) => {
                      if (!date) return;
                      setToDate(date);
                      setValue((prev: any) => ({
                        ...prev,
                        to_date: format(date, "yyyy-MM-dd"),
                        page: 1
                      }));
                      setOpenTo(!toDate)
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}

            <Select
              defaultValue="10"
              onValueChange={(v) =>
                setValue((prev: any) => ({ ...prev, per_page: v, page: 0 }))
              }
            >
              <SelectTrigger className="min-h-11 w-1/3 border border-slate-200 bg-white text-slate-400 shadow-none">
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
        </div>
      </div >

    </>
  );
};

export default memo(HeaderFilter);
