import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import BookTotalCount from '../../total-book-count/BookTotalCount';

import BookListContainer from 'src/components/booklist/BookListContainer';
import { fetchBooks } from 'src/store/action-creators/book.actions';
import { setPaginationData } from 'src/store/action-creators/pagination.actions';
import { useCustomSelector } from 'src/utils/hooks';

import { BookPaginationPageProps } from './BookPaginationPageTypes';

const BookPaginationPage: React.FC<BookPaginationPageProps> = ({ currentPage = 1 }) => {
  const dispatch = useDispatch();

  const {
    bookState: { sortOptions, totalBookCount, search },
  } = useCustomSelector();

  useEffect(() => {
    const doActions = async () => {
      await setPaginationData(dispatch, currentPage);
      await fetchBooks(dispatch, Number(currentPage), sortOptions, search);
    };
    doActions();
  }, [currentPage, dispatch, sortOptions, search]);

  return (
    <main className="main">
      <div className="main-title-group">
        <h1 className="main__title">All books</h1>
      </div>
      <BookTotalCount totalBookCount={totalBookCount} />
      <BookListContainer />
    </main>
  );
};

export default BookPaginationPage;
