import React from 'react';
import { render } from '@testing-library/react';

import Details from '../Details';

const bookItem = {
  id: '1',
  title: 'Title',
  category: { id: '1', name: 'Science' },
  publisher: { id: '1', name: 'MFTI' },
  authors: [{ id: '1', name: 'Name' }],
  price: 11,
  discount: 0.11,
  ageLimit: 16,
  publicationYear: 1999,
  numberOfPages: 321,
  format: ['122', '321'],
  vendor: 'd12r3f',
  rating: 4,
  image: 'ImageURL',
};

describe('Details', () => {
  it('should render currently', () => {
    const { getByTestId } = render(<Details book={bookItem} />);
    const list = getByTestId('details');
    expect(list).toHaveClass('book-view__details-list');
  });

  it('Details snapshot', () => {
    const container = render(<Details book={bookItem} />);
    expect(container).toMatchSnapshot();
  });
});
