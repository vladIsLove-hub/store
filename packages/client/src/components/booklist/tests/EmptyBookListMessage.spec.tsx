import React from 'react';
import { render, screen } from '@testing-library/react';

import EmptyBookListMessage from '../EmptyBookListMessage';

describe('EmptyBookListMessage', () => {
  it('should render correctly', () => {
    render(<EmptyBookListMessage />);
    const text = 'There are no books on this category yet. They will appear here in the near future!';
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('EmptyBookListMessage snapshot', () => {
    const container = render(<EmptyBookListMessage />);
    expect(container).toMatchSnapshot();
  });
});
