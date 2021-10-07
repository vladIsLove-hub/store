import React from 'react';

import { DetailsItemLabelProps } from './details.types';

const DetailsItemLabel: React.FC<DetailsItemLabelProps> = ({ text }) => {
  return (
    <div className="book-view__details-list-item-left">
      <span className="book-view__details-list-item-name">{text}</span>
    </div>
  );
};

export default DetailsItemLabel;
