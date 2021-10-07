import React from 'react';

import getEntityValues from '../../../utils/getEntityValues';

import { DetailsItemProps, DetailsItemType } from './details.types';
import SingleEntityFieldValue from './SingleEntityFieldValue';
import PlainTextFieldValue from './PlainTextFieldValue';
import MultipleEntityFieldValue from './MultipleEntityFieldValue';

const DetailsItem: React.FC<DetailsItemProps> = ({ type, value, title }) => {
  const { entity, entityValue, entityList, entityNames } = getEntityValues(value);
  switch (type) {
    case DetailsItemType.SingleEntityValue:
      return <SingleEntityFieldValue title={title} entityValues={entity ? entity.name : ''} />;
    case DetailsItemType.MultipleEntityValue:
      return (
        <MultipleEntityFieldValue title={title} entityValues={entityNames ? entityNames : ''} entityList={entityList} />
      );
    default:
      return <PlainTextFieldValue title={title} entityValues={entityValue ? entityValue : ''} />;
  }
};

export default DetailsItem;
