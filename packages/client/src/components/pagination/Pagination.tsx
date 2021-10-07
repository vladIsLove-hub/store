import React from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';

import { useCustomSelector } from 'src/utils/hooks';

import { PaginationData } from './PaginationTypes';

const Pagination = () => {
  const history = useHistory();
  const {
    bookState: { totalPages, currentPage },
    categoryState: { currentCategoryName },
  } = useCustomSelector();

  const generatePathForPushToURL = async (data: PaginationData) => {
    const path = currentCategoryName
      ? `/categories/${currentCategoryName}/${data.selected + 1}`
      : `/${data.selected + 1}`;
    return path;
  };

  const onPageChangeHandler = async (data: PaginationData) => {
    const path = await generatePathForPushToURL(data);
    history.push(path);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        pageCount={totalPages}
        previousLabel="<"
        nextLabel=">"
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        containerClassName={'pagination'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        forcePage={currentPage - 1}
        activeClassName={'active'}
        onPageChange={onPageChangeHandler}
      />
    </div>
  );
};

export default Pagination;
