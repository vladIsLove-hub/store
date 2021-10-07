import React from 'react';

import searchBookRenderBorders from '../../../utils/searchBookRenderBorders';

import SearchDropdownItem from './SearchDropdownItem';
import { SearchDropdownProps } from './SearchDropdownTypes';

const SearchDropdown: React.FC<SearchDropdownProps> = ({ books, setBooks, setSearch }) => {
  const booksForRender = books.splice(searchBookRenderBorders.min, searchBookRenderBorders.max);

  return (
    <>
      <div className={`search-dropdown ${booksForRender.length > 0 ? 'search-dropdown-visible' : ''}`}>
        {booksForRender.map(book => {
          return <SearchDropdownItem key={book.id} book={book} setBooks={setBooks} setSearch={setSearch} />;
        })}
      </div>
    </>
  );
};

export default SearchDropdown;
