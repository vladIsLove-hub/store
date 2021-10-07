import React from 'react';

import { DetailsItemPrintTextProps } from './details.types';

const DetailsItemPrintText: React.FC<DetailsItemPrintTextProps> = ({ text }) => {
  return (
    <div className="book-view__details-list-item-right">
      <span data-testid="item-value" title={text} className="book-view__details-list-item-value">
        {text}
      </span>
    </div>
  );
};

export default DetailsItemPrintText;
