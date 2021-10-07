import React from 'react';

import BookListItem from './BookListItem';
import { BookListProps, Book } from './BookListTypes';

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map((book: Book) => {
        return <BookListItem book={book} key={book.id} />;
      })}
    </ul>
  );
};

export default BookList;
