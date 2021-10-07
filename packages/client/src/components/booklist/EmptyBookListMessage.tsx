import React from 'react';

const EmptyBookListMessage = () => {
  return (
    <h2 className="book-list__no-book-found">
      There are no books on this category yet. They will appear here in the near future!
    </h2>
  );
};

export default EmptyBookListMessage;
