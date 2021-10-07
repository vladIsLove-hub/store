import { Book } from '../../booklist/BookListTypes';

export enum DetailsItemType {
  PlainTextValue = 'PlainTextValue',
  SingleEntityValue = 'SingleEntityValue',
  MultipleEntityValue = 'MultipleEntityValue',
}

export type PlainTextValue = string | number;

export type SingleEntityValue = {
  id: string;
  name: string;
};

export type MultipleEntityValue = SingleEntityValue[];

export type DetailsItemProps = {
  type: string;
  value: PlainTextValue | SingleEntityValue | MultipleEntityValue;
  title: string;
};

export type DetailsProps = {
  book: Book;
};

export type DetailsItemLabelProps = {
  text: string;
};

export type DetailsItemPrintTextProps = DetailsItemLabelProps;

export type DetailsItemFieldRenderProps = {
  title: string;
  entityValues: string;
  entityList?: MultipleEntityValue;
};
