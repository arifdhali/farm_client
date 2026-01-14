import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Badge,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Edit2Icon,
  Eye,
  Filter,
  LucideFileWarning,
  Pencil,
  Plus,
  PlusIcon,
  Search,
  Trash,
  Trash2,
  TrashIcon,
  View,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const List = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleDelete = (id: number): void => {
    setOpenAlert(!openAlert);
  };

  return (
    <>
      <div className=" rounded-xl bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
              Farmer Listing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage and monitor all registered poultry farmers across
              locations.
            </p>
          </div>
          <Link
            to={"/farms/add"}
            className=" flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <PlusIcon />
            Add Farmer
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 pt-4 bg-background-light dark:bg-background-dark">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4  translate-y-1/2 text-slate-400 pointer-events-none">
                <Search />
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="Search by farmer name, address or mobile..."
                type="text"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                <Filter />
                Filters
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto @container">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Farmer Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
                      Address
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Mobile Number
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Farm Capacity
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Samuel Green"
                          style={{
                            backgroundImage:
                              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9NG1Kb7xNEXdiDP4alp3ILUnFLgQqDDlgXErXBuOCYtf3Mk2B9vdq8ImXv8JZT0H8wKfNMmqTXEUWMdIXWgWtrfbcESOyYZ3NRtHgAiDJhylsJU2ZqmyaEEgDwQBB1qWpmW5XiSBAtMEd2F0s3wMZfr3VAy5opTKAjlMC8z1UOxob6h-1s8f7gZk9BIEtqjmaYjaTcrf_RDzIX-ITM0-pVi-61xgH1sTdmQkc1ZbwRiuDxRC0PAkPl8jsj71noHlgCzvn0jmPXDW0')",
                          }}
                        ></div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">
                          Samuel Green
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">
                      123 North Valley, Highland St.
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      +1 555-0101
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      5,000 birds
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5"></span>
                        Free
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="text-[20px]">
                            <Eye className="size-5" />
                          </span>
                        </button>
                        <Link
                          to={"/farms/1/edit"}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="size-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(1)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-100  transition-colors "
                          title="Delete"
                        >
                          <Trash className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Maria Rodriguez"
                          style={{
                            backgroundImage:
                              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsGwa5Y9XwIOnS2UTp6PvjNOgmjC8W3oTpWE70-BI5KMIHSBLj1O--66unq6rY7dfgEokrOoH7Ec52qp5HSa53tC-joTWO38R5Cogt2CBP8_vU66XPI_rHApiPJglfFLL7nVb8Ac8HyFzMJGSCmpZ3ePLcQIFny5utmMHD61GY8mVByeuAxZOWtRFixiJ2bXL-D7WWxncH2sm9JCB6oWwfliYAX9OHGyTFrcO9m9o9FnrXUCD4L1tFzOM8mNR3DUABQXfEJKgGOJ_z')",
                          }}
                        ></div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">
                          Maria Rodriguez
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">
                      Plot 42, East Wing Industrial
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      +1 555-0102
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      10,000 birds
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <span className="w-1 h-1 rounded-full bg-amber-500 mr-1.5"></span>
                        Occupied
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="text-[20px]">
                            <Eye className="size-5" />
                          </span>
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="size-5" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-100  transition-colors "
                          title="Delete"
                        >
                          <Trash className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer David Wu"
                          style={{
                            backgroundImage:
                              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvhhYCJq0VvR_8yxzonu2xUSK5p6LtuAf7FDDFTS-kjaYOPYAfhYf15nTssY685-3c4BBdo2lHdSOvgitEERD9z-1r5Ez-U51LgxlgG3WR7Eq5fCWlZdPmo8-TVt7h3KUI7jiSqd88f6_RL92KlkQsvFG4OpQV9BBdFNfepvqimar7z8UTP28ppWgFI5v82hxlzMMB5RT1ltWYEpkZq0ORbxdypcr8td3pBX-ZYFgziBT8JtfiCusKHCdKNHY0waHq07aTklh97fON')",
                          }}
                        ></div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">
                          David Wu
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">
                      Green Hills Farm, Road 7
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      +1 555-0103
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      2,500 birds
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5"></span>
                        Free
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="text-[20px]">
                            <Eye className="size-5" />
                          </span>
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="size-5" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-100  transition-colors "
                          title="Delete"
                        >
                          <Trash className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Elena Fisher"
                          style={{
                            backgroundImage:
                              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpzjQo4pGK9W7gR4Sc2cAqH9pcXbrJ-Qh0uI4YwQ17CkUjaczB8_TFrnKOtXGcHIDa2Go3uzbnLAxH7lbN5ZJFRzgskoCEpk3e-KjxC2ABnSt3BUDvdTR0OBqcQwbntQBUg9L-4chQ_b2hlg_w2RAYrtoGDGszShTfWFMZX6KYwPGW5GBxilCAPZcnNcMz6P5s2BWlosQy-3MJUU_6iQ05YX-4FRxmyVjUFhDF-g5nT_tju9WNPgoKZfqKcPwdy9jvl2EyvHt0xdLg')",
                          }}
                        ></div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">
                          Elena Fisher
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">
                      Sector 7 Road, Suite 210
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      +1 555-0104
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      7,500 birds
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <span className="w-1 h-1 rounded-full bg-amber-500 mr-1.5"></span>
                        Occupied
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="text-[20px]">
                            <Eye className="size-5" />
                          </span>
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="size-5" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-100  transition-colors "
                          title="Delete"
                        >
                          <Trash className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Robert Bell"
                          style={{
                            backgroundImage:
                              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCndonsj98mXzp5H7_nroXW45TUBRrNT9f0dzuRUl6zQaikv6WGiTLh0FXD7-XSumAAxCXhYNSqooes34ObFNIc2WUKL99Ng8RZijQUbjgtXPI0LKOCb1LYoHcm7pm7Pwr77iWQX3_gwKS8B3r2BAJBXTi06BFlmro-_eLTHF3aKjnZOcYhdKawgg-hzlENxkVZ3WdV6ezsGN30uAFwyVVxjYldYJB7o7cFw2yEKcvxqaR09EDFRfz9BThPGXzSJY2w0NiZqd4QmBro')",
                          }}
                        ></div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">
                          Robert Bell
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">
                      Riverside Plot 9, South Coast
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      +1 555-0105
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      12,000 birds
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5"></span>
                        Free
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="text-[20px]">
                            <Eye className="size-5" />
                          </span>
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="size-5" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-100  transition-colors "
                          title="Delete"
                        >
                          <Trash className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing 1 to 5 of 42 entries
              </p>
              <div className="flex items-center gap-1">
                <a
                  className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-400"
                  href="#"
                >
                  <span className="text-[20px]">
                    <ChevronLeft />
                  </span>
                </a>
                <a
                  className="text-xs font-bold flex size-9 items-center justify-center text-white rounded-lg bg-primary shadow-sm"
                  href="#"
                >
                  1
                </a>
                <a
                  className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  href="#"
                >
                  2
                </a>
                <a
                  className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  href="#"
                >
                  3
                </a>
                <span className="text-slate-400 px-1">...</span>
                <a
                  className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  href="#"
                >
                  9
                </a>
                <a
                  className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-400"
                  href="#"
                >
                  <span className="text-[20px]">
                    <ChevronRight />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="p-8 w-110 border-0 items-center">
          <div className="mx-auto p-4 w-fit flex items-center justify-center bg-red-600 rounded-full">
            <TrashIcon className="text-white" />
          </div>
          <AlertDialogHeader className="mb-8 mt-4 items-center">
            <AlertDialogTitle className="text-2xl font-bold text-[#181111] dark:text-white leading-tight">
              Delete Farmer?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#896161] text-sm leading-relaxed mt-3 text-center">
              Are you sure you want to delete{" "}
              <strong className="font-semibold text-black">Jane Smith</strong>?
              This action cannot be undone and all associated records will be
              lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 gap-4">
            <AlertDialogCancel className="flex items-center justify-center rounded-lg h-12 bg-gray-200 dark:bg-[#3a1d1d] text-[#181111] dark:text-white hover:text-white border-0 text-sm font-bold  hover:bg-primary/90 dark:hover:bg-[#4d2727] ">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="flex items-center justify-center rounded-lg h-12 bg-red-600 text-white text-sm font-bold hover:bg-primary/90  shadow-lg shadow-primary/20">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default List;
