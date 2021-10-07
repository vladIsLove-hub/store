import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import BookListItem from '../BookListItem';

const bookItem = {
  id: '1',
  title: 'Title',
  category: { id: '1', name: 'Science' },
  publisher: { id: '1', name: 'MFTI' },
  authors: [{ id: '1', name: 'Name' }],
  price: 11,
  ageLimit: 16,
  publicationYear: 1999,
  numberOfPages: 321,
  format: ['122', '321'],
  vendor: 'd12r3f',
  rating: 4,
  image: 'ImageURL',
};

describe('BookListItem', () => {
  it('should render correctly', () => {
    const bookWithDiscount = {
      ...bookItem,
      discount: 0.11,
    };
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <BookListItem key="1" book={bookWithDiscount} />
      </BrowserRouter>,
    );
    const list = getByTestId('book-item');
    expect(list).toHaveClass('book-item');

    expect(list).toContainElement(getByText('Title'));
    expect(list).toContainElement(getByText('4/5'));
    expect(list).toContainElement(getByText('9.79 $'));
    expect(list).toContainElement(getByText('11 $'));
    expect(list).toContainElement(getByText('-11.0 %'));
  });

  it('sould render currently without discount', () => {
    const bookWithoutDiscount = {
      ...bookItem,
      discount: 0,
    };
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <BookListItem key="1" book={bookWithoutDiscount} />
      </BrowserRouter>,
    );
    const list = getByTestId('book-item');
    expect(list).toHaveClass('book-item');

    expect(list).toContainElement(getByText('Title'));
    expect(list).toContainElement(getByText('4/5'));
    expect(list).toContainElement(getByText('11 $'));
  });

  it('sould render currently without images', () => {
    const bookWithDiscount = {
      ...bookItem,
      discount: 0.11,
      image: '',
    };
    const { getByTestId, getByText, getByAltText } = render(
      <BrowserRouter>
        <BookListItem key="1" book={bookWithDiscount} />
      </BrowserRouter>,
    );
    const list = getByTestId('book-item');
    expect(list).toHaveClass('book-item');

    expect(list).toContainElement(getByText('Title'));
    expect(list).toContainElement(getByText('4/5'));
    expect(list).toContainElement(getByText('9.79 $'));
    expect(list).toContainElement(getByText('11 $'));
    expect(list).toContainElement(getByText('-11.0 %'));
    expect(list).toContainElement(getByAltText('Sorry, image of book was not loaded :C'));
  });

  it('should change location when user click on <more> button', () => {
    const bookWithDiscount = {
      ...bookItem,
      discount: 0.11,
    };
    render(
      <BrowserRouter>
        <BookListItem key="1" book={bookWithDiscount} />
      </BrowserRouter>,
    );
    const pathname = '/books/1';
    userEvent.click(screen.getByText('More'));
    expect(window.location.pathname).toEqual(pathname);
  });

  it('BookListItem snapshot', () => {
    const bookWithDiscount = {
      ...bookItem,
      discount: 0.11,
    };
    const bookListItem = render(
      <BrowserRouter>
        <BookListItem key="1" book={bookWithDiscount} />
      </BrowserRouter>,
    );

    expect(bookListItem).toMatchSnapshot();
  });
});
