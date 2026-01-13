import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge, ChevronLeft, ChevronRight, Download, Edit, Edit2Icon, Eye, Filter, Pencil, Plus, Search, Trash, Trash2, View } from 'lucide-react'


const list = () => {
  return (
    <>

      <div
        className="flex-1 overflow-y-auto p-8 bg-background-light dark:bg-background-dark"
      >
        <div className="space-y-6">
          <div
            className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 relative">
              <span
                className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              >search</span
              >
              <input
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Search by farmer name, address or mobile..."
                type="text"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                <span className="material-symbols-outlined text-[20px]"
                >filter_list</span
                >
                <span>Filters</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                <span className="material-symbols-outlined text-[20px]"
                >download</span
                >
                <span>Export</span>
              </button>
            </div>
          </div>
          <div
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="overflow-x-auto @container">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800"
                  >
                    <th
                      className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    >
                      Farmer Name
                    </th>
                    <th
                      className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell"
                    >
                      Address
                    </th>
                    <th
                      className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    >
                      Mobile Number
                    </th>
                    <th
                      className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    >
                      Farm Capacity
                    </th>
                    <th
                      className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y divide-slate-100 dark:divide-slate-800"
                >
                  <tr
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Samuel Green"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9NG1Kb7xNEXdiDP4alp3ILUnFLgQqDDlgXErXBuOCYtf3Mk2B9vdq8ImXv8JZT0H8wKfNMmqTXEUWMdIXWgWtrfbcESOyYZ3NRtHgAiDJhylsJU2ZqmyaEEgDwQBB1qWpmW5XiSBAtMEd2F0s3wMZfr3VAy5opTKAjlMC8z1UOxob6h-1s8f7gZk9BIEtqjmaYjaTcrf_RDzIX-ITM0-pVi-61xgH1sTdmQkc1ZbwRiuDxRC0PAkPl8jsj71noHlgCzvn0jmPXDW0')" }}
                        ></div>
                        <div
                          className="font-semibold text-slate-900 dark:text-white text-sm"
                        >
                          Samuel Green
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell"
                    >
                      123 North Valley, Highland St.
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium"
                    >
                      +1 555-0101
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                    >
                      5,000 birds
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5"
                        ></span>
                        Free
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >visibility</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >edit</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >delete</span
                          >
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Maria Rodriguez"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsGwa5Y9XwIOnS2UTp6PvjNOgmjC8W3oTpWE70-BI5KMIHSBLj1O--66unq6rY7dfgEokrOoH7Ec52qp5HSa53tC-joTWO38R5Cogt2CBP8_vU66XPI_rHApiPJglfFLL7nVb8Ac8HyFzMJGSCmpZ3ePLcQIFny5utmMHD61GY8mVByeuAxZOWtRFixiJ2bXL-D7WWxncH2sm9JCB6oWwfliYAX9OHGyTFrcO9m9o9FnrXUCD4L1tFzOM8mNR3DUABQXfEJKgGOJ_z')" }}
                        ></div>
                        <div
                          className="font-semibold text-slate-900 dark:text-white text-sm"
                        >
                          Maria Rodriguez
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell"
                    >
                      Plot 42, East Wing Industrial
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium"
                    >
                      +1 555-0102
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                    >
                      10,000 birds
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-amber-500 mr-1.5"
                        ></span>
                        Occupied
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >visibility</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >edit</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >delete</span
                          >
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer David Wu"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvhhYCJq0VvR_8yxzonu2xUSK5p6LtuAf7FDDFTS-kjaYOPYAfhYf15nTssY685-3c4BBdo2lHdSOvgitEERD9z-1r5Ez-U51LgxlgG3WR7Eq5fCWlZdPmo8-TVt7h3KUI7jiSqd88f6_RL92KlkQsvFG4OpQV9BBdFNfepvqimar7z8UTP28ppWgFI5v82hxlzMMB5RT1ltWYEpkZq0ORbxdypcr8td3pBX-ZYFgziBT8JtfiCusKHCdKNHY0waHq07aTklh97fON')" }}
                        ></div>
                        <div
                          className="font-semibold text-slate-900 dark:text-white text-sm"
                        >
                          David Wu
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell"
                    >
                      Green Hills Farm, Road 7
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium"
                    >
                      +1 555-0103
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                    >
                      2,500 birds
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5"
                        ></span>
                        Free
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >visibility</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >edit</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >delete</span
                          >
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Elena Fisher"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpzjQo4pGK9W7gR4Sc2cAqH9pcXbrJ-Qh0uI4YwQ17CkUjaczB8_TFrnKOtXGcHIDa2Go3uzbnLAxH7lbN5ZJFRzgskoCEpk3e-KjxC2ABnSt3BUDvdTR0OBqcQwbntQBUg9L-4chQ_b2hlg_w2RAYrtoGDGszShTfWFMZX6KYwPGW5GBxilCAPZcnNcMz6P5s2BWlosQy-3MJUU_6iQ05YX-4FRxmyVjUFhDF-g5nT_tju9WNPgoKZfqKcPwdy9jvl2EyvHt0xdLg')" }}

                        ></div>
                        <div
                          className="font-semibold text-slate-900 dark:text-white text-sm"
                        >
                          Elena Fisher
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell"
                    >
                      Sector 7 Road, Suite 210
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium"
                    >
                      +1 555-0104
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                    >
                      7,500 birds
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-amber-500 mr-1.5"
                        ></span>
                        Occupied
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >visibility</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >edit</span
                          >
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >delete</span
                          >
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                          data-alt="Portrait of farmer Robert Bell"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCndonsj98mXzp5H7_nroXW45TUBRrNT9f0dzuRUl6zQaikv6WGiTLh0FXD7-XSumAAxCXhYNSqooes34ObFNIc2WUKL99Ng8RZijQUbjgtXPI0LKOCb1LYoHcm7pm7Pwr77iWQX3_gwKS8B3r2BAJBXTi06BFlmro-_eLTHF3aKjnZOcYhdKawgg-hzlENxkVZ3WdV6ezsGN30uAFwyVVxjYldYJB7o7cFw2yEKcvxqaR09EDFRfz9BThPGXzSJY2w0NiZqd4QmBro')" }}
                        ></div>
                        <div
                          className="font-semibold text-slate-900 dark:text-white text-sm"
                        >
                          Robert Bell
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell"
                    >
                      Riverside Plot 9, South Coast
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium"
                    >
                      +1 555-0105
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                    >
                      12,000 birds
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-emerald-500 mr-1.5"
                        ></span>
                        Free
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-[20px]"
                          >
                            <Eye  className='size-5' />
                          </span
                          >
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors" title="Edit">
                          <Edit  className='size-5' />
                        </button>
                        <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-100  transition-colors " title="Delete" >
                          <Trash className='size-5'/>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between" >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing 1 to 5 of 42 entries
              </p>
              <div className="flex items-center gap-1">
                <a
                  className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-400"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[20px]"
                  ><ChevronLeft /></span
                  >
                </a>
                <a
                  className="text-xs font-bold flex size-9 items-center justify-center text-white rounded-lg bg-primary shadow-sm"
                  href="#"
                >1</a
                >
                <a
                  className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  href="#"
                >2</a
                >
                <a
                  className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  href="#"
                >3</a
                >
                <span className="text-slate-400 px-1">...</span>
                <a
                  className="text-xs font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  href="#"
                >9</a
                >
                <a
                  className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-400"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[20px]"
                  >
                    <ChevronRight />
                  </span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default list