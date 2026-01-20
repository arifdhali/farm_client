import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowLeftToLineIcon, Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const Delivery = () => {
  const [FarmsStatus, setFarmsStatus] = useState<"free" | "occupied">("free");
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = React.useState("")
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ] 
  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col ">
            <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-black leading-tight tracking-[-0.033em]">
              Send to Farmer
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
              Send to a farmer and their livestock capacity to the system.
            </p>
          </div>
          <Link
            to={"/farms/list"}
            className="bg-white hover:text-primary dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 w-150 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <form className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                Farmer Name
              </label>
              <Popover  open={open} onOpenChange={setOpen}>
                <PopoverTrigger  className="border-slate-200 h-[44px]"  asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-white shadow-none"
                  >
                    {value
                      ? frameworks.find((framework) => framework.value === value)?.label
                      : "Select framework..."}
                    <ChevronsUpDown  />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-0 border border-slate-200" align="start">
                  <Command className="border-0">
                    <CommandInput placeholder="Search framework..." className="h-9 border-0" />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === framework.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
               Quantity
              </label>
              <input
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                placeholder="200"
                type="tel"
              />
            </div>
             
            <div className="col-span-1 ">
              <div className="flex justify-between gap-x-8">
                <div className="flex flex-col w-1/2 ">
                  <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                    Farmer Rate
                  </label>
                  <input
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                    placeholder="Fixed price"
                    type="number"
                  />
                </div>
                <div className="flex flex-col w-1/2 ">
                  <label className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-normal mb-2">
                    Commision Percentage (%)
                  </label>
                  <input
                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-3 text-base"
                    placeholder="10.2%"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              className="px-6 py-3 rounded-lg text-sm font-bold bg-red-600 text-white dark:text-zinc-400 hover:bg-red-400 dark:hover:bg-zinc-800 transition-colors"
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              type="submit"
            >
              Add Farmer
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Delivery;
