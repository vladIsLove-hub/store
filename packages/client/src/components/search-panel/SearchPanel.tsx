import React, { FC, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchIcon from '../../icons/SearchIcon.svg';
import { focusHandler, blurHandler } from '../../utils/SearchBarEventHandlers';
import { Book } from '../booklist/BookListTypes';
import { searchChangeHandler, setSearchData } from '../../store/action-creators/search.actions';

import SearchDropdown from './search-dropdown/SearchDropdown';

const SearchPanel: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const requestDelay = 300;
  const debounced = useDebouncedCallback(async e => {
    await searchChangeHandler<Book[]>(e, setBooks);
  }, requestDelay);

  const clickHandler = (): void => {
    setSearchData(dispatch, search);
    setSearch('');
    setBooks([]);
    history.push('/');
  };

  return (
    <div className="search-panel">
      <img src={SearchIcon} alt="" className="search-panel__icon" />
      <input
        value={search}
        onFocus={focusHandler}
        onBlur={blurHandler}
        type="search"
        placeholder="Enter book name or author-name..."
        className="search-panel__input"
        onChange={e => {
          setSearch(e.target.value);
          debounced(e);
        }}
      />
      <button
        disabled={Boolean(!search)}
        onClick={clickHandler}
        className={`search-panel__btn ${search ? '' : 'search-panel__btn-disabled'}`}
      >
        Search
      </button>
      <SearchDropdown books={books} setBooks={setBooks} setSearch={setSearch} />
    </div>
  );
};

export default SearchPanel;
