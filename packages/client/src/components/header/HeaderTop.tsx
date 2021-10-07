import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SearchPanel from '../search-panel/SearchPanel';
import Basket from '../Basket';
import BookIcon from '../../icons/BookIcon.svg';

import { clearErrorInState } from 'src/store/action-creators/exception.actions';
import { clearSortData } from 'src/store/action-creators/sort.actions';
import { clearSidebarFormData } from 'src/store/action-creators/sidebar.actions';
import resetSidebarForm from 'src/utils/resetSidebarForm';
import { clearSearchData } from 'src/store/action-creators/search.actions';

import HeaderAuthBlock from './HeaderAuthBlock';

const HeaderTop: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="header-top">
      <Link
        className="header-top__link"
        to="/"
        onClick={() => {
          resetSidebarForm();
          clearSortData(dispatch);
          clearErrorInState(dispatch);
          clearSidebarFormData(dispatch);
          clearSearchData(dispatch);
        }}
      >
        <img src={BookIcon} alt="Logo" className="header-top__logo" />
        <h2 className="header-top__title">BookStore</h2>
      </Link>
      <SearchPanel />
      <HeaderAuthBlock visibility={true} />
      <Basket visibility={true} />
    </div>
  );
};

export default HeaderTop;
