import React from 'react';
import { Link } from 'react-router-dom';

import { SearchDropdownItemProps } from './SearchDropdownTypes';

const SearchDropdownItem: React.FC<SearchDropdownItemProps> = ({ book, setBooks, setSearch }) => {
  const { id, title, authors } = book;

  const authorNames = authors
    .map(author => {
      return author.name;
    })
    .join(',');

  const clickHandler = () => {
    setSearch('');
    setBooks([]);
  };

  return (
    <Link to={`/books/${id}`} onClick={clickHandler} className="search-dropdown-item">
      <div className="search-dropdown-item__img" />
      <span>{title}</span>
      <span>{authorNames}</span>
    </Link>
  );
};

export default SearchDropdownItem;
