import React, { useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Basket from '../Basket';
import HeaderAuthBlock from '../header/HeaderAuthBlock';
import { useCustomSelector } from '../../utils/hooks';
import resetSidebarForm from '../../utils/resetSidebarForm';

import { fetchCategories } from 'src/store/action-creators/category.actions';
import { clearErrorInState } from 'src/store/action-creators/exception.actions';
import { clearSortData } from 'src/store/action-creators/sort.actions';
import { clearSidebarFormData } from 'src/store/action-creators/sidebar.actions';
import { clearSearchData } from 'src/store/action-creators/search.actions';

import NavLinkItem from './NavLinkItem';

const NavPanel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories(dispatch);
  }, [dispatch]);

  const {
    categoryState: { categories },
  } = useCustomSelector();

  return (
    <Navbar className="nav" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav nav__btn" />
      <Navbar.Collapse className="nav__container" id="basic-navbar-nav">
        <Nav className="nav__list">
          <NavLink
            exact
            className="nav__link"
            to="/"
            onClick={() => {
              resetSidebarForm();
              clearSortData(dispatch);
              clearErrorInState(dispatch);
              clearSidebarFormData(dispatch);
              clearSearchData(dispatch);
            }}
          >
            All
          </NavLink>
          {categories.map(category => {
            const { id, name } = category;
            return <NavLinkItem key={id} name={name} id={id} />;
          })}
          <Basket visibility={false} />
          <HeaderAuthBlock visibility={false} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavPanel;
