import React, { memo } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import type { paginationProp } from '@/types/Farm';
const CustomPagination = ({ page, per_page, total, onPageChange }: paginationProp) => {
    const totalPages = Math.ceil(total / per_page);
    const currentPage = page == 0 ? 1 : page;
    console.log('custom paginations');
    const generatePages = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    return (

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {currentPage} to {totalPages} of {total} entries
            </p>

            <Pagination className="w-fit" style={{ marginRight: 0 }}>
                <PaginationContent>
                    <PaginationItem className='me-3'>
                        <PaginationPrevious
                            onClick={() =>
                                currentPage > 0 && onPageChange(currentPage - 1)
                            }
                          
                            className={`${currentPage == 1 ? "cursor-not-allowed bg-accent text-accent-foreground" : "bg-primary text-white"}`}
                        />
                    </PaginationItem>
                    {
                        generatePages().map((p,i) => (
                            <PaginationItem key={i} >
                                <PaginationLink className={`${currentPage == p ? 'bg-primary text-white' : ''}  `} href="#">{p}</PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    {
                        totalPages > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }
                    <PaginationItem className='ps-3'>
                        <PaginationNext
                            onClick={() =>
                                currentPage < totalPages && onPageChange(currentPage + 1)
                            } className={`${currentPage != 1 && currentPage <= totalPages ? "cursor-not-allowed bg-accent text-accent-foreground" : "bg-primary text-white"}`}

                            />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default memo(CustomPagination)