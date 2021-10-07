import React from 'react';
import { render, screen } from '@testing-library/react';

import DetailsItem from '../DetailsItem';
import { DetailsItemType } from '../details.types';

describe('DetailsItemSingleValue', () => {
  const title = 'Title';
  const singleValue = {
    id: '1',
    name: 'Name',
  };

  it('should render currently', () => {
    render(<DetailsItem title={title} value={singleValue} type={DetailsItemType.SingleEntityValue} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('DetailsItem snapshot for SingleEntityValue data', () => {
    const container = render(
      <DetailsItem title={title} value={singleValue} type={DetailsItemType.SingleEntityValue} />,
    );
    expect(container).toMatchSnapshot();
  });
});
