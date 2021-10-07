import React from 'react';
import { render } from '@testing-library/react';

import DetailsItemLabel from '../DetailsItemLabel';

describe('DetailsItemLabel', () => {
  it('should render cuurently', () => {
    const { getByText } = render(<DetailsItemLabel text="test" />);
    expect(getByText('test')).toBeInTheDocument();
  });
  it('DetailsItemLabel snapshot', () => {
    const { getByText } = render(<DetailsItemLabel text="test" />);
    expect(getByText('test')).toMatchSnapshot();
  });
});
