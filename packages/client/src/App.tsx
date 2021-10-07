import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import SortingSidebar from 'src/components/sorting-sidebar/SortingSidebar';

import BookViewItem from './components/book-view-item/BookViewItem';
import Header from './components/header/Header';
import FilteredCategoryPage from './components/pages/FilteredCategoryPage/FilteredCategoryPage';
import BookPaginationPage from './components/pages/BookPaginationPage/BookPaginationPage';

const App: FC = () => {
  return (
    <>
      <Header />
      <SortingSidebar />
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return (
              <>
                <BookPaginationPage />
              </>
            );
          }}
        />

        <Route
          path="/:page"
          exact
          render={({ match }) => {
            const { page } = match.params;
            return (
              <>
                <BookPaginationPage currentPage={Number(page)} />
              </>
            );
          }}
        />

        <Route
          path="/categories/:category/:page"
          exact
          render={({ match }) => {
            const { category, page } = match.params;
            return (
              <>
                <FilteredCategoryPage currentPage={Number(page)} categoryName={category} />
              </>
            );
          }}
        />

        <Route
          path="/books/:bookId"
          exact
          render={({ match }) => {
            const { bookId } = match.params;
            return (
              <>
                <BookViewItem bookId={bookId} />
              </>
            );
          }}
        />
      </Switch>
    </>
  );
};

export default App;
