import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  DownloadCloudIcon,
  Edit,
  Eye,
  Filter,
  Pencil,
  Plus,
  PlusIcon,
  Search,
  Trash,
  TrashIcon,
} from "lucide-react";

import type { DateRange } from "react-day-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const List = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleDelete = (id: number): void => {
    setOpenAlert(!openAlert);
  };
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  });
  const items = [
    {
      value: "item-1",
      trigger: "How do I reset my password?",
      content:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
    },
    {
      value: "item-2",
      trigger: "Can I change my subscription plan?",
      content:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
    },
    {
      value: "item-3",
      trigger: "What payment methods do you accept?",
      content:
        "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    },
  ]
  return (
    <>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="max-w-lg"
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default List;
