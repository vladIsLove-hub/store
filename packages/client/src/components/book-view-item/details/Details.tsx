import React from 'react';

import { DetailsProps, DetailsItemType } from './details.types';
import DetailsItem from './DetailsItem';

const Details: React.FC<DetailsProps> = ({ book }) => {
  return (
    <ul data-testid="details" className="book-view__details-list">
      <DetailsItem value={book.authors} title={'Authors'} type={DetailsItemType.MultipleEntityValue} />
      <DetailsItem value={book.category} title={'Category'} type={DetailsItemType.SingleEntityValue} />
      <DetailsItem value={book.publisher} title={'Publisher'} type={DetailsItemType.SingleEntityValue} />
      <DetailsItem value={`${book.ageLimit}+`} title={'Age limit'} type={DetailsItemType.PlainTextValue} />
      <DetailsItem value={book.publicationYear} title={'Publication year'} type={DetailsItemType.PlainTextValue} />
      <DetailsItem value={book.numberOfPages} title={'Pages'} type={DetailsItemType.PlainTextValue} />
      <DetailsItem value={book.format.join(' x ')} title={'Format'} type={DetailsItemType.PlainTextValue} />
    </ul>
  );
};

export default Details;
