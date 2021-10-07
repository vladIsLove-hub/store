import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import BookListContainer from 'src/components/booklist/BookListContainer';
import BookTotalCount from 'src/components/total-book-count/BookTotalCount';
import { fetchBooksByCategoryName } from 'src/store/action-creators/book.actions';
import { setCategoryName } from 'src/store/action-creators/category.actions';
import { setPaginationData } from 'src/store/action-creators/pagination.actions';
import { useCustomSelector } from 'src/utils/hooks';

import { FilteredCategoryPageProps } from './FilteredCategoryPageTypes';

const FilteredCategoryPage: React.FC<FilteredCategoryPageProps> = ({ categoryName, currentPage = 1 }) => {
  const dispatch = useDispatch();

  const {
    bookState: { sortOptions, totalBookCount },
  } = useCustomSelector();

  useEffect(() => {
    const doActions = async () => {
      setCategoryName(dispatch, categoryName);
      await setPaginationData(dispatch, currentPage, categoryName);
      await fetchBooksByCategoryName(dispatch, categoryName, Number(currentPage), sortOptions);
    };
    doActions();
  }, [dispatch, categoryName, currentPage, sortOptions]);

  return (
    <>
      <main className="main">
        <div className="main-title-group">
          <h1 className="main__title">{categoryName}</h1>
        </div>
        <BookTotalCount totalBookCount={totalBookCount} />
        <BookListContainer />
      </main>
    </>
  );
};

export default FilteredCategoryPage;
