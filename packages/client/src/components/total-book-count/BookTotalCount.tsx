import React from 'react';

import { BookTotalCountProps } from './BookTotalCountTypes';

const BookTotalCount: React.FC<BookTotalCountProps> = ({ totalBookCount }) => {
  return <>{totalBookCount !== null && <span className="total-count">Books found: {totalBookCount}</span>}</>;
};

export default BookTotalCount;
