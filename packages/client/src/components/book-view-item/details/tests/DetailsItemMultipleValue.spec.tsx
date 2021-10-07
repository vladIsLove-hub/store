import React from 'react';
import { render } from '@testing-library/react';

import DetailsItem from '../DetailsItem';
import { DetailsItemType } from '../details.types';

describe('DetailsItemMultipleValue', () => {
  const title = 'Title';
  const multipleValue = [
    {
      id: '1',
      name: 'Name1',
    },
    {
      id: '2',
      name: 'Name2',
    },
  ];

  it('sould render currently', () => {
    const { getByText } = render(
      <DetailsItem title={title} value={multipleValue} type={DetailsItemType.MultipleEntityValue} />,
    );
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Name1, Name2')).toBeInTheDocument();
  });

  it('should render currently with one value', () => {
    const multipleValueWithOneObject = [
      {
        id: '1',
        name: 'Name1',
      },
    ];
    const { getByText, getByTestId } = render(
      <DetailsItem title={title} value={multipleValueWithOneObject} type={DetailsItemType.MultipleEntityValue} />,
    );

    const spanItemValue = getByTestId('item-value');

    expect(getByText('Title')).toBeInTheDocument();
    expect(spanItemValue).toHaveTextContent('Name1');
  });

  it('DetailsItem snapshot for MultipleEntityValues data', () => {
    const container = render(
      <DetailsItem title={title} value={multipleValue} type={DetailsItemType.MultipleEntityValue} />,
    );
    expect(container).toMatchSnapshot();
  });
});
