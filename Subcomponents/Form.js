import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import Field from './Field';

export const FormContext = React.createContext('');

const Form = (props) => {
  const [values, setValues] = useState({...props.values});
  const [errors, setErrors] = useState({});

  //Submission stuff, userSubmit is a function that stores whatever the user put into the onPress
  //button. handleSubmit is our end's checks before allowing the submission
  const defaultFunction = () => {};
  const onSubmit = props.onSubmit ?? defaultFunction;
  const schema = props.validationSchema;
  const handleSubmit = () => {
    if (schema) {
      schema
        .validate(values, {abortEarly: false})
        .then((validatedValues) => {
          finishHandleSubmission(validatedValues);
        })
        .catch((err) => {
          setErrors({});
          err.inner.forEach((issue) => {
            setErrors((prevValue) => {
              return {
                ...prevValue,
                [issue.path]: issue.errors,
              };
            });
          });
          return;
        });
    } else {
      finishHandleSubmission(values);
    }
  };

  const finishHandleSubmission = (finalValues) => {
    setErrors({});
    onSubmit(finalValues);
    props.doNotClear ? null : setValues({...props.values});
  };

  //this code chunk pulls the user function to give it the values in the handleSubmit
  //might want to change this to an onSubmit prop instead
  let modifiedChildren = React.Children.toArray(props.children);

  modifiedChildren.forEach((child, index) => {
    if (
      child.props.hasOwnProperty('type') &&
      child.props.type.toLowerCase() === 'submit'
    ) {
      modifiedChildren[index] = React.cloneElement(child, {
        onPress: handleSubmit,
      });
    }
  });

  const validate = (field) => {
    if (!schema.fields.hasOwnProperty(field)) {
      return;
    }

    schema
      .validateAt(`${field}`, values)
      .then((value) => {
        setErrors((prevValue) => ({
          ...prevValue,
          [field]: null,
        }));
      })
      .catch((err) => {
        setErrors((prevValue) => {
          return {
            ...prevValue,
            [field]: err.errors,
          };
        });
        return;
      });
  };

  return (
    <FormContext.Provider
      value={{
        values: values,
        setValues: setValues,
        errors: errors,
        validate: validate,
        validateOnChange: props.validateOnChange,
        validateOnBlur: props.validateOnBlur,
      }}>
      {modifiedChildren}
    </FormContext.Provider>
  );
};

export default Form;
