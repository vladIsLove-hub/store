import React from 'react';

import BookListItemCurrency from '../booklist/BookListItemCurrency';

import { SidebarProps } from './BookViewItemTypes';

const PriceSidebar: React.FC<SidebarProps> = ({ price, discount, title }) => {
  return (
    <div data-testid="price-sidebar" className="book-view__sidebar">
      <h3 className="book-view__sidebar-title">{title}</h3>
      <BookListItemCurrency price={price ?? 0} discount={discount ?? 0} />
      <button className="book-view__sidebar-btn-bsk">Add to Basket</button>
      <button className="book-view__sidebar-btn-fav">
        <span>Add to Favourites</span>
      </button>
    </div>
  );
};

export default PriceSidebar;
