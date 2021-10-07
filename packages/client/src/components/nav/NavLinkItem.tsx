import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import resetSidebarForm from '../../utils/resetSidebarForm';

import { clearErrorInState } from 'src/store/action-creators/exception.actions';
import { clearSidebarFormData } from 'src/store/action-creators/sidebar.actions';
import { clearSortData } from 'src/store/action-creators/sort.actions';

import { NavLinkProps } from './NavTypes';

const NavLinkItem: React.FC<NavLinkProps> = ({ name }) => {
  const dispatch = useDispatch();
  return (
    <NavLink
      exact
      className="nav__link"
      to={`/categories/${name}/1`}
      onClick={() => {
        resetSidebarForm();
        clearSortData(dispatch);
        clearErrorInState(dispatch);
        clearSidebarFormData(dispatch);
      }}
    >
      {name}
    </NavLink>
  );
};

export default NavLinkItem;
