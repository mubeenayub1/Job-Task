import React, { FC, useState, ChangeEvent } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
  error?: string;
  text?: string;
  editable?: boolean;
  onFocus?: () => void;
  onChangeText?: (text: string) => void;
}

const InputField: FC<InputFieldProps> = ({ error, editable, onFocus = () => {}, onChangeText = () => {}, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    onFocus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    onChangeText(text);
  };

  return (
    <>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? '#E40757' : isFocused ? '#A1A0A0' : '#A1A0A0',
            alignItems: 'center',
          },
        ]}
      >
        <TextInput
          autoCorrect={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          placeholderTextColor={'#A1A0A0'}
          style={{
            color: 'black',
            fontSize: 15,
            width: '83%',
            marginLeft: '2%',
          }}
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ marginTop: 5, color: '#E40757', fontSize: 13 }}>
          {error}
        </Text>
      )}
    </>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderColor: '#A1A0A0',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default InputField;
