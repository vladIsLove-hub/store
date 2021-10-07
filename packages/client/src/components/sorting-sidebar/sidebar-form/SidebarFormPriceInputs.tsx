import React from 'react';
import { FormControl } from 'react-bootstrap';

import { SidebarFormPriceInputsProps } from './SidebarFormTypes';

const SidebarFormPriceInputs: React.FC<SidebarFormPriceInputsProps> = ({ values, errors, handleChange }) => {
  return (
    <>
      <FormControl
        className="form-sort__indent mt-5"
        placeholder="Price from ($)"
        type="number"
        id="priceFrom"
        name="priceFrom"
        onChange={handleChange}
        value={values.priceFrom}
      />
      {errors.priceFrom && <span className="error">{errors.priceFrom}</span>}

      <FormControl
        placeholder="Price up to ($)"
        type="number"
        id="priceTo"
        name="priceTo"
        onChange={handleChange}
        value={values.priceTo}
      />
      {errors.priceTo && <span className="error">{errors.priceTo}</span>}
    </>
  );
};

export default SidebarFormPriceInputs;
