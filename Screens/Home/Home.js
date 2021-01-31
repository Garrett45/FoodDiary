import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import DiaryList from './DiaryList';

const Home = ({navigation}) => {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [currentKey, setKey] = useState(0);

  const addDiaryItem = (submission) => {
    setList((oldList) => [
      ...oldList,
      {
        key: currentKey.toString(),
        value: submission,
        desc: 'default description',
      },
    ]);

    setKey(currentKey + 1);

    setText('');
  };

  return (
    <View>
      <Button title="+" onPress={() => navigation.navigate('Food Adder')} />
      <TextInput
        placeholder="Enter food here!"
        onChangeText={(inputText) => setText(inputText)}
        defaultValue={text}
        onSubmitEditing={() => {
          addDiaryItem(text);
        }}
      />
      <DiaryList data={list} />
    </View>
  );
};

export default Home;
