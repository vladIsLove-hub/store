import React from 'react';

import { Discount } from './BookListTypes';

const mainCurrency = ' $';

const BookListItemCurrency = ({ price, discount }: Discount) => {
  return (
    <div data-testid="currency" className="book-item__prices">
      <span className="book-item__price">
        {getActualPrice(price, discount)}
        {mainCurrency}
      </span>
      {discount !== 0 && (
        <>
          <span className="book-item__overprice">
            {price}
            {mainCurrency}
          </span>
          <span className="book-item__percent">-{(discount * 100).toFixed(1)} %</span>
        </>
      )}
    </div>
  );
};

function getActualPrice(price: number, percent: number): number {
  const discount = Number((price * percent).toFixed(3));
  return Number((price - discount).toFixed(2));
}

export default BookListItemCurrency;
