import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';

import { useCustomSelector } from 'src/utils/hooks';
import { fetchBooks, fetchBooksByCategoryName } from 'src/store/action-creators/book.actions';
import { clearSidebarFormData, setSidebarFormData } from 'src/store/action-creators/sidebar.actions';
import { clearSortData, setSortData } from 'src/store/action-creators/sort.actions';
import resetSidebarForms from 'src/utils/resetSidebarForm';

import { validationSchema } from './form-validation/validationSchema';
import SidebarFormRadioField from './SidebarFormRadioField';
import SidebarFormRadioPriceFields from './SidebarFormRadioPriceFields';
import SidebarFormPriceInputs from './SidebarFormPriceInputs';
import { SidebarFormProps } from './SidebarFormTypes';
import { ValidationSchemaType } from './form-validation/validationSchemaTypes';

const SidebarForm: React.FC<SidebarFormProps> = ({ handleClose }) => {
  const dispatch = useDispatch();

  const {
    categoryState: { currentCategoryName },
    bookState: { currentPage, search },
    sidebarState,
  } = useCustomSelector();

  const submit = async (values: ValidationSchemaType) => {
    if (handleClose) {
      handleClose();
    }
    const jsonsortOptions: string = JSON.stringify(values);
    setSortData(dispatch, jsonsortOptions);
    currentCategoryName
      ? fetchBooksByCategoryName(dispatch, currentCategoryName, currentPage, jsonsortOptions)
      : fetchBooks(dispatch, currentPage, jsonsortOptions, search);
    setSidebarFormData(dispatch, jsonsortOptions);
  };

  return (
    <Formik
      initialValues={sidebarState}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, errors, handleChange, handleSubmit, dirty, resetForm, isValid }) => {
        return (
          <Form className="form-sort">
            <SidebarFormRadioField label="Alphabet" name="sortOptions" value="title,ASC" />
            <SidebarFormRadioField label="Best discount" name="sortOptions" value="discount,DESC" />
            <SidebarFormRadioField label="Top rating" name="sortOptions" value="rating,DESC" />
            <SidebarFormRadioPriceFields />
            <SidebarFormPriceInputs values={values} errors={errors} handleChange={handleChange} />

            <button
              type="button"
              className="btn btn-primary mt-5 reset-sidebar-form"
              onClick={() => {
                if (handleClose) {
                  handleClose();
                }
                resetSidebarForms();
                clearSidebarFormData(dispatch);
                resetForm();
                clearSortData(dispatch);
              }}
            >
              Reset
            </button>

            <button
              type="button"
              className="btn btn-main mt-2"
              disabled={Boolean(!isValid || !dirty)}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SidebarForm;
