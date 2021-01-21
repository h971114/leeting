import React from 'react';
import _ from 'lodash';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumber = [];

    // Math.ceil: 올림
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumber.map((pageNum) => 
                <li
                    key={pageNum}
                    className="pagination_item"
                    onClick={() => paginate(pageNumber)}
                >
                    {pageNum}
                </li>
            )}
        </ul>
    );
};

export default Pagination;