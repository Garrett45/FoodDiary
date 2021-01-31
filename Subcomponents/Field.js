import React, {useEffect} from 'react';
import {useContext} from 'react';
import {View} from 'react-native';
import {FormTextInput, FormLabel, FormError} from './FormComponents';
import {FormContext} from './Form';

const Field = (props) => {
  const context = useContext(FormContext);

  const formatName = (str) => {
    let formattedName = '';

    [...str].forEach((char, index) => {
      if (index === 0) {
        formattedName += char.toUpperCase();
      } else if (char === char.toUpperCase()) {
        formattedName += ' ' + char;
      } else {
        formattedName += char;
      }
    });

    return formattedName;
  };

  useEffect(() => {
    if (
      context.values[props.name] !== undefined &&
      (context.validateOnChange || props.validateOnChange)
    )
      context.validate(props.name);
  }, [context.values[props.name]]);

  const label = props.label ?? formatName(props.name);
  const LabelComponent = props.labelComponent ?? FormLabel;
  const InputComponent = props.inputComponent ?? FormTextInput;
  const ErrorComponent = props.errorComponent ?? FormError;

  return (
    <View>
      <LabelComponent style={props.labelStyle}>{label}</LabelComponent>
      <InputComponent
        onChangeText={(inputText) => {
          context.setValues((prevValue) => {
            return {
              ...prevValue,
              [props.name]: inputText,
            };
          });
        }}
        onBlur={() => {
          if (props.validateOnBlur || context.validateOnBlur) {
            context.validate(props.name);
          }
        }}
        value={context.values[props.name]}
        style={props.inputStyle}
        {...props}
      />
      {context.errors[props.name] ? (
        <ErrorComponent style={props.errorStyle}>
          {context.errors[props.name]}
        </ErrorComponent>
      ) : null}
    </View>
  );
};

export default Field;
