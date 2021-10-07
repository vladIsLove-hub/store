import React from 'react';
import { render, screen } from '@testing-library/react';

import DetailsItem from '../DetailsItem';
import { DetailsItemType } from '../details.types';

describe('DetailsItemPlainTextValue', () => {
  const title = 'Title';
  const simplyValue = 'Value';

  it('should render currently', () => {
    render(<DetailsItem title={title} value={simplyValue} type={DetailsItemType.PlainTextValue} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('DetailsItem snapshot for PlainTextValue data', () => {
    const container = render(<DetailsItem title={title} value={simplyValue} type={DetailsItemType.PlainTextValue} />);
    expect(container).toMatchSnapshot();
  });
});
