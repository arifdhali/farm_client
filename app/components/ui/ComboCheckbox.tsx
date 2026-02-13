
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
    forwardRef, useImperativeHandle, useMemo, useState
} from "react";
import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./button";

export type ComboCheckboxRef = {
    open: () => void;
    close: () => void;
};

type ComboCheckboxProps = {
    label: string;
    items: any[];
    selectedId: number | null;
    onSelect: (id: number) => void;
};

const ComboCheckbox = forwardRef<ComboCheckboxRef, ComboCheckboxProps>(({ label, items, selectedId, onSelect }, ref) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const selectedItem = items.find(
        (i) => Number(i.id) === selectedId
    );
    const filteredItems = useMemo(() => {
        if (!search) return items;

        return items.filter((item: any) =>
            item.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [items, search]);

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false),
    }));

    return (

        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full border-slate-200 h-12 justify-between bg-white shadow-none font-normal text-sm"
                >
                    {selectedItem ? selectedItem.name : `Select ${label}...`}
                    <ChevronsUpDown />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 border border-slate-200" align="start">
                <Command className="border-0">
                    <CommandInput placeholder={`Search ${label}...`} value={search} onValueChange={(e) => setSearch(e)} className="border-0" />
                    <CommandList>
                        <CommandEmpty>No data found.</CommandEmpty>
                        <CommandGroup>
                            {filteredItems.map((item: any) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={() => {
                                        onSelect(Number(item.id));
                                        setOpen(false);
                                    }}
                                >
                                    {item.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedId === Number(item.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

    );
});

export default ComboCheckbox;