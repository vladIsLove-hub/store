import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Field } from 'formik';

import { SidebarFormRadioFieldProps } from './SidebarFormTypes';

const SidebarFormField: React.FC<SidebarFormRadioFieldProps> = ({ label, name, value }) => {
  return (
    <InputGroup className="mb-3">
      <FormControl disabled={true} value={label} />
      <span className="input-group-text">
        <Field type="radio" name={name} value={value} className="form-sort__checkbox form-check-input" />
      </span>
    </InputGroup>
  );
};

export default SidebarFormField;
