import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageLimit = 5; // Limit of page numbers displayed at once
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > pageLimit) {
        if (currentPage <= Math.floor(pageLimit / 2)) {
            endPage = pageLimit;
        } else if (currentPage + Math.floor(pageLimit / 2) >= totalPages) {
            startPage = totalPages - pageLimit + 1;
        } else {
            startPage = currentPage - Math.floor(pageLimit / 2);
            endPage = startPage + pageLimit - 1;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className='d-flex justify-content-center'>
            <ul className='pagination'>
                <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <a onClick={() => paginate(currentPage - 1)} href='!#' className='page-link'>
                        Previous
                    </a>
                </li>
                {startPage > 1 && (
                    <>
                        <li className='page-item'>
                            <a onClick={() => paginate(1)} href='!#' className='page-link'>
                                1
                            </a>
                        </li>
                        {startPage > 2 && <li className='page-item'><span className='page-link'>...</span></li>}
                    </>
                )}
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                        <a onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <li className='page-item'><span className='page-link'>...</span></li>}
                        <li className='page-item'>
                            <a onClick={() => paginate(totalPages)} href='!#' className='page-link'>
                                {totalPages}
                            </a>
                        </li>
                    </>
                )}
                <li className={currentPage === totalPages ? 'page-item disabled' : 'page-item'}>
                    <a onClick={() => paginate(currentPage + 1)} href='!#' className='page-link'>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;