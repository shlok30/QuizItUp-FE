import React, { useState } from 'react';

type ValidationRule = {
  name: string;
  error: string;
  validation: (value: string) => boolean;
};

type ValidationMap = {
  [key: string]: ValidationRule[];
};

type FormFieldState = {
  value: string;
  error: string;
};

type UseFormProps = {
  initialValues: Record<string, FormFieldState>;
  validations: ValidationMap;
};

function useForm({ initialValues, validations }: UseFormProps) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    setFormValues(prevState => ({
      ...prevState,
      [name]: { ...prevState[name], value: e.target.value },
    }));
  };

  const handleFocus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    setFormValues(prevState => ({
      ...prevState,
      [name]: { ...prevState[name], error: '' },
    }));
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    const validationsToRun = validations[name];
    for (const { validation, error } of validationsToRun) {
      if (!validation(value)) {
        setFormValues(prevState => ({
          ...prevState,
          [name]: { ...prevState[name], error },
        }));
        break;
      }
    }
  };

  const validateAllFields = (): string[] => {
    const fields = Object.keys(formValues) as ('input' | 'difficulty')[];
    const updatedValues = { ...formValues };
    const errors: string[] = [];
    fields.forEach(field => {
      const validationsToRun = validations[field];
      const value = formValues[field].value;
      let error = '';
      for (const { validation, error: e } of validationsToRun) {
        if (!validation(value)) {
          error = e;
          errors.push(e);
          break;
        }
      }
      updatedValues[field] = { ...updatedValues[field], error };
    });
    setFormValues({ ...updatedValues });
    return errors;
  };

  return {
    formValues,
    handleChange,
    handleBlur,
    handleFocus,
    validateAllFields,
  };
}

export default useForm;
