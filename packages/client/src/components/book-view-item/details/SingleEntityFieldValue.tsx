import React from 'react';

import { DetailsItemFieldRenderProps } from './details.types';
import DetailsItemPrintText from './DetailsItemPrintText';
import DetailsItemLabel from './DetailsItemLabel';

const SingleEntityFieldValue: React.FC<DetailsItemFieldRenderProps> = ({ title, entityValues }) => {
  return (
    <li className="book-view__details-list-item">
      <DetailsItemLabel text={title} />
      <DetailsItemPrintText text={entityValues} />
    </li>
  );
};

export default SingleEntityFieldValue;
