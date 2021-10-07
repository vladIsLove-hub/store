import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import NoneBookImg from '../../icons/OpenBook.svg';
import Star from '../../icons/Star.svg';

import BookListItemCurrency from './BookListItemCurrency';
import { BookListItemProps } from './BookListTypes';

const BookListItem: FC<BookListItemProps> = ({ book }) => {
  const { id, title, price, discount, authors, image, rating } = book;

  const authorsList = authors
    .map(author => {
      return author.name;
    })
    .join(', ');

  return (
    <li data-testid="book-item" className="book-item">
      {book.image ? (
        <img src={image} alt={title} className="book-item__img" />
      ) : (
        <img className="book-item__no-img" src={NoneBookImg} alt="Sorry, image of book was not loaded :C" />
      )}
      <h5 title={title} className="book-list__title">
        {title}
      </h5>
      <BookListItemCurrency price={price} discount={discount} />
      <span title={authorsList} className="book-item__author">
        {authorsList}
      </span>
      <span>
        <img src={Star} className="book-view__star-icon" />
        {rating}/5
      </span>
      <div className="book-item__btns">
        <button className="book-item__addBasket"> Add to Basket </button>
        <Link to={`/books/${id}`} className="book-item__more">
          More
        </Link>
      </div>
    </li>
  );
};

export default BookListItem;
