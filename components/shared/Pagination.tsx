import { Meta } from "@/app/dashboard/components/uploadsList";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from "react";

interface PaginationProps {
  meta: Meta;
}

const PaginationComponent = ({ meta }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePageChange = (page: number) => {
        const pathname = window.location.pathname;
        router.push(`${pathname}?page=${page}`);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={!meta.hasPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={!meta.hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination> 
        </Suspense>
    );  
      
};

export default PaginationComponent;
