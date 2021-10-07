import React from 'react';
import { render } from '@testing-library/react';

import DetailsItemPrintText from '../DetailsItemPrintText';

describe('DetailsItemPrintText', () => {
  it('should render cuurently', () => {
    const { getByText } = render(<DetailsItemPrintText text="test" />);
    expect(getByText('test')).toBeInTheDocument();
  });
  it('DetailsItemPrintText snapshot', () => {
    const { getByText } = render(<DetailsItemPrintText text="test" />);
    expect(getByText('test')).toMatchSnapshot();
  });
});
