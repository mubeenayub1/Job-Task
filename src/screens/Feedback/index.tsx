import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Icon } from '@rneui/themed';
import InputField from '../../components/input';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Inputs {
  name: string;
  email: string;
  feedback: string;
}

const FeedBackScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [rating, setRating] = useState<string>('3');
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    email: '',
    feedback: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleOnchange = (text: string, input: keyof Inputs) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error: string, input: keyof Inputs) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const SaveData = async () => {
    let isValid = true;
    if (!inputs.name) {
      handleError('Please input name', 'name');
      isValid = false;
    }
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }

    if (rating.toString() === '0') {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please Select Rating',
        autoClose: 1500,
      });
    }
    if (isValid) {
      const obj = { rating, ...inputs };
      try {
        await AsyncStorage.setItem('feedback', JSON.stringify(obj));
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Your Feedback has been saved successfully!',
          autoClose: 1500,
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log('error---------', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon
          name="arrowleft"
          type="antdesign"
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headertxt}>Feedback</Text>
        <Icon name="arrowleft" type="antdesign" color={'transparent'} />
      </View>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <InputField
          placeholder={'Name'}
          onChangeText={(text) => handleOnchange(text, 'name')}
          onFocus={() => handleError(null, 'name')}
          error={errors.name}
        />
        <InputField
          placeholder={'Email'}
          onChangeText={(text) => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          error={errors.email}
        />
        <Rating
          showRating
          onFinishRating={(selectedRating) => setRating(selectedRating.toString())}
          style={{ paddingVertical: 10, marginTop: 20 }}
        />

        <View style={styles.input}>
          <TextInput
            autoCorrect={false}
            placeholder={'Feedback'}
            multiline={true}
            onChangeText={(text) => handleOnchange(text, 'feedback')}
            placeholderTextColor={'#A1A0A0'}
            style={styles.inputtxt}
          />
        </View>

        <Pressable style={styles.button} onPress={() => SaveData()}>
          <Text style={styles.buttontxt}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  headertxt: {color: 'black', fontSize: 18, fontWeight: '600'},
  input: {
    width: '100%',
    height: 120,
    borderColor: '#A1A0A0',
    borderWidth: 1.5,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#A1A0A0',
  },
  inputtxt: {
    color: 'black',
    fontSize: 15,
    width: '83%',
    marginLeft: '2%',
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25C5F5',
    marginTop: 20,
  },
  buttontxt: {color: 'white', fontSize: 16, fontWeight: '600'},
});
export default FeedBackScreen;

