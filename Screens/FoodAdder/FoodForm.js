import React from 'react';
import {
  Button,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Field from '../../Subcomponents/Field';
import Form from '../../Subcomponents/Form';
import * as yup from 'yup';
import {FormTextInput} from '../../Subcomponents/FormComponents';
import {
  IndentedView,
  ViewWithBottom,
  BottomMarginView,
} from './FoodFormComponents';

const FoodFieldTextInput = (props) => {
  const styles = StyleSheet.create({
    field: {},
    unit: {},
  });

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <FormTextInput keyboardType={'number-pad'} {...props} />
      <Text>{props.unit}</Text>
    </View>
  );
};

const FoodField = (props) => {
  return <Field inputComponent={FoodFieldTextInput} {...props} />;
};

const FoodForm = ({navigation}) => {
  return (
    <ScrollView>
      <Form
        onSubmit={(values) => console.log('SUBMISSION: ', values)}
        validationSchema={yup.object().shape({
          totalFat: yup.number().required(),
          saturatedFat: yup.number().required(),
        })}>
        <BottomMarginView>
          <ViewWithBottom>
            <Field name="name" />
            <FoodField name="calories" unit="cal" />
            <FoodField name="totalFat" unit="g" />
            <IndentedView>
              <FoodField name="saturatedFat" unit="g" />
              <FoodField name="transFat" unit="g" />
            </IndentedView>
            <FoodField name="cholesterol" unit="mg" />
            <FoodField name="sodium" unit="mg" />
            <FoodField name="totalCarbohydrates" unit="g" />
            <IndentedView>
              <FoodField name="dietaryFiber" unit="g" />
              <FoodField name="totalSugars" unit="g" />
              <IndentedView>
                <FoodField name="addedSugars" unit="g" />
              </IndentedView>
            </IndentedView>
            <FoodField name="protein" unit="g" />
          </ViewWithBottom>
          <FoodField name="vitaminD" unit="mcg" />
          <FoodField name="calcium" unit="mg" />
          <FoodField name="iron" unit="mg" />
          <FoodField name="potassium" unit="mg" />
        </BottomMarginView>
        <Button title="Submit" type="submit" />
      </Form>
    </ScrollView>
  );
};

export default FoodForm;
