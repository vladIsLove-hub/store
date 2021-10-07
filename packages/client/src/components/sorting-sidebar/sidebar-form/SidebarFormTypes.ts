import { FormikErrors, FormikValues } from 'formik';

import { ValidationSchemaType } from './form-validation/validationSchemaTypes';

export type SidebarFormRadioFieldProps = {
  label: string;
  name: string;
  value: string;
};

export type SidebarFormProps = {
  handleClose?: () => void;
};

export interface SidebarFormPriceInputsProps {
  values: ValidationSchemaType;
  errors: FormikErrors<FormikValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
