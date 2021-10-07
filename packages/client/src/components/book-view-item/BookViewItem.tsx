import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Star from '../../icons/Star.svg';
import NoneBookImg from '../../icons/OpenBook.svg';
import { Book } from '../booklist/BookListTypes';
import Spinner from '../spinner/Spinner';
import { fetchBookById } from '../../store/action-creators/book.actions';
import ErrorMessage from '../error/ErrorMessage';
import { useCustomSelector } from '../../utils/hooks';

import { clearErrorInState } from 'src/store/action-creators/exception.actions';

import { BookViewItemProps } from './BookViewItemTypes';
import Details from './details/Details';
import PriceSidebar from './PriceSidebar';

const BookViewItem: React.FC<BookViewItemProps> = ({ bookId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    bookState: { error },
  } = useCustomSelector();

  const [book, setBook] = useState<Book>();

  useEffect(() => {
    fetchBookById(bookId, dispatch).then(bookResponse => {
      bookResponse && setBook(bookResponse);
    });
  }, [bookId, dispatch]);

  const useHistoryGoBack = () => {
    history.goBack();
  };

  if (error) {
    return (
      <div className="book-view__error">
        <ErrorMessage text="No book found for this request" />
        <Link
          to="/"
          className="book-view__go-back"
          onClick={() => {
            return clearErrorInState(dispatch);
          }}
        >
          Go to Main page
        </Link>
      </div>
    );
  }

  return (
    <>
      {book ? (
        <section className="book-view">
          <button className="book-view__go-back" onClick={useHistoryGoBack}>
            Go back
          </button>
          <h3 className="book-view__category">{book.category.name}</h3>
          <h2 className="book-view__title">
            {book.authors[0].name} : {book.title}
          </h2>
          <span className="book-view__vendor">Vendor: {book.vendor}</span>
          <div className="book-view__info">
            <div className="book-rating">
              <img className="book-view__star-icon" src={Star} alt="" />
              <span className="book-rating-num">{book.rating}</span>
            </div>
          </div>
          <div className="book-view__about">
            <div className="book-view__image">
              {book.image ? (
                <img className="book-view__img" src={book.image} alt={book.title} />
              ) : (
                <img className="book-view__no-img" src={NoneBookImg} alt="Sorry, image of book was not loaded :C" />
              )}
            </div>
            <div className="book-view__details">
              <h4 className="book-view__details-title">Details</h4>
              <Details book={book} />
            </div>
            <PriceSidebar title={book.title} price={book.price} discount={book.discount} />
          </div>
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BookViewItem;
