import { Pagination } from "flowbite-react";
import { useState } from "react";

export default function DefaultPagination({setOffset, limit, total}) {
    const totalPage = total ? Math.ceil(total/limit) : 0
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => {
        setOffset(limit * (page-1))
        setCurrentPage(page)
    };

    return (
        <div className="flex text-sm overflow-x-auto justify-center">
            {totalPage > 0 && <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} showIcons/>}
        </div>
    );
}
