import * as yup from 'yup';

import { ErrorMessageTypeForValidate, ValuesForBoundsOfValidation } from './validationSchemaTypes';

export const validationSchema = yup.object().shape(
  {
    priceFrom: yup.number().when('priceTo', {
      is: (priceTo: number | undefined) => {
        return priceTo;
      },
      then: yup
        .number()
        .min(ValuesForBoundsOfValidation.MIN, ErrorMessageTypeForValidate.MIN)
        .lessThan(yup.ref('priceTo'), 'Must be less price to')
        .max(ValuesForBoundsOfValidation.MAX, ErrorMessageTypeForValidate.MAX),
      otherwise: yup
        .number()
        .min(ValuesForBoundsOfValidation.MIN, ErrorMessageTypeForValidate.MIN)
        .max(ValuesForBoundsOfValidation.MAX, ErrorMessageTypeForValidate.MAX),
    }),
    priceTo: yup.number().when('priceFrom', {
      is: (priceFrom: number | undefined) => {
        return priceFrom;
      },
      then: yup
        .number()
        .min(ValuesForBoundsOfValidation.MIN, ErrorMessageTypeForValidate.MIN)
        .moreThan(yup.ref('priceFrom'), 'Must be more price from')
        .max(ValuesForBoundsOfValidation.MAX, ErrorMessageTypeForValidate.MAX),
      otherwise: yup
        .number()
        .min(ValuesForBoundsOfValidation.MIN, ErrorMessageTypeForValidate.MIN)
        .max(ValuesForBoundsOfValidation.MAX, ErrorMessageTypeForValidate.MAX),
    }),
  },
  [['priceFrom', 'priceTo']],
);
