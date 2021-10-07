export type ValidationSchemaType = {
  priceFrom?: string;
  priceTo?: string;
  sortOptions: string;
};

export enum ErrorMessageTypeForValidate {
  MIN = 'Should be greater than 0',
  MAX = 'Should be less than 1000',
}

export enum ValuesForBoundsOfValidation {
  MIN = 0,
  MAX = 1000,
}
