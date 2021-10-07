import React from 'react';
import { render } from '@testing-library/react';

import BookListItemCurrency from '../BookListItemCurrency';

describe('BookListItemCurrency', () => {
  it('should render correctly', () => {
    const { getByText, getByTestId } = render(<BookListItemCurrency discount={0.11} price={11} />);
    const container = getByTestId('currency');

    expect(container).toContainElement(getByText('9.79 $'));
    expect(container).toContainElement(getByText('11 $'));
    expect(container).toContainElement(getByText('-11.0 %'));
  });

  it('should render correctly without discount', () => {
    const { getByText, getByTestId } = render(<BookListItemCurrency discount={0} price={11} />);
    const container = getByTestId('currency');

    expect(container).toContainElement(getByText('11 $'));
  });

  it('BookListItemCurrency', () => {
    const component = render(<BookListItemCurrency discount={0.11} price={11} />);
    expect(component).toMatchSnapshot();
  });
});
