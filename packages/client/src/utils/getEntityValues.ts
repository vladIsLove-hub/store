import {
  PlainTextValue,
  SingleEntityValue,
  MultipleEntityValue,
} from '../components/book-view-item/details/details.types';

type GetEntityReturnedValues = {
  entityValue?: string;
  entity?: SingleEntityValue;
  entityList?: MultipleEntityValue;
  entityNames?: string;
};

const getEntityValues = (value: PlainTextValue | SingleEntityValue | MultipleEntityValue): GetEntityReturnedValues => {
  if (typeof value === 'string' || typeof value === 'number') {
    return {
      entityValue: value.toString(),
    };
  }

  if (Array.isArray(value)) {
    const nameList = value
      .map(entity => {
        return entity.name;
      })
      .join(', ');
    return {
      entityList: value,
      entityNames: nameList,
    };
  }

  return {
    entity: value,
  };
};

export default getEntityValues;
