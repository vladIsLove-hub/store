import React from 'react';
import { render } from '@testing-library/react';

import PriceSidebar from '../PriceSidebar';

describe('PriceSidebar', () => {
  const data = {
    price: 10,
    discount: 0.1,
    title: 'Title',
  };

  it('should render currently', () => {
    const { getByText, getByTestId } = render(
      <PriceSidebar price={data.price} title={data.title} discount={data.discount} />,
    );
    const priceSidebar = getByTestId('price-sidebar');

    expect(priceSidebar).toContainElement(getByText('Title'));
    expect(priceSidebar).toContainElement(getByText('Add to Basket'));
    expect(priceSidebar).toContainElement(getByText('Add to Favourites'));
    expect(priceSidebar).toContainElement(getByText('9 $'));
    expect(priceSidebar).toContainElement(getByText('10 $'));
    expect(priceSidebar).toContainElement(getByText('-10.0 %'));
  });

  it('should render currently without discount', () => {
    const { getByText, getByTestId } = render(<PriceSidebar price={data.price} title={data.title} discount={0} />);

    const priceSidebar = getByTestId('price-sidebar');

    expect(priceSidebar).toContainElement(getByText('Title'));
    expect(priceSidebar).toContainElement(getByText('Add to Basket'));
    expect(priceSidebar).toContainElement(getByText('Add to Favourites'));
    expect(priceSidebar).toContainElement(getByText('10 $'));
  });

  it('PriceSidebar snapshot', () => {
    const container = render(<PriceSidebar price={data.price} title={data.title} discount={data.discount} />);
    expect(container).toMatchSnapshot();
  });
});
