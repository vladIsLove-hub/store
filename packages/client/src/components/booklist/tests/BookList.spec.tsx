import React from 'react';
import { render, screen } from '@testing-library/react';

import BookList from '../BookList';

describe('BookList', () => {
  it('should render correctly', () => {
    render(<BookList books={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument;
    expect(screen.getByRole('list')).toHaveClass('book-list');
  });

  it('BookList snapshot', () => {
    const bookList = render(<BookList books={[]} />);
    expect(bookList).toMatchSnapshot();
  });
});
