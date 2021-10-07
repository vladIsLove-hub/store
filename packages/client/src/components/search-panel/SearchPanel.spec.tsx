import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { focusHandler, blurHandler } from '../../utils/SearchBarEventHandlers';
import store from '../../store/store';

import SearchPanel from './SearchPanel';

describe('SearchPanel', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>,
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter book name.../i)).toBeInTheDocument();
  });

  it('focusHandler defined', () => {
    expect(focusHandler).toBeDefined();
  });

  it('blurHandler defined', () => {
    expect(blurHandler).toBeDefined();
  });

  it('input styles ixists', () => {
    render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>,
    );
    expect(screen.getByPlaceholderText(/Enter book name.../i)).toHaveClass('search-panel__input');
  });

  it('typing in search input', () => {
    render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>,
    );
    expect(screen.queryByDisplayValue(/Some/)).toBeNull();
    userEvent.type(screen.getByRole('searchbox'), 'Some');
    expect(screen.queryByDisplayValue(/Some/));
  });

  it('Search snapshot', () => {
    const search = render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>,
    );
    expect(search).toMatchSnapshot();
  });
});
