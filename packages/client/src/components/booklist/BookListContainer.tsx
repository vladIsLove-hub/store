import React from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Pagination from '../pagination/Pagination';
import { useCustomSelector } from '../../utils/hooks';

import EmptyBookListMessage from './EmptyBookListMessage';
import BookList from './BookList';

const BookListContainer = () => {
  const {
    bookState: { books, loading, error },
  } = useCustomSelector();

  if (error) {
    return <ErrorMessage textSize={30} text={error} />;
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : books.length !== 0 ? (
        <>
          <BookList books={books} />
          <Pagination />
        </>
      ) : (
        <EmptyBookListMessage />
      )}
    </>
  );
};

export default BookListContainer;
