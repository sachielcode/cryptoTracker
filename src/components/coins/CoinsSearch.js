import { useLinkProps } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import { Value } from 'react-native-reanimated';

import Colors from '../../resources/colors';

const CoinsSearch = (props) => {
  const [query, setQuery] = useState('');

  const handleText = (text) => {
    setQuery(text);

    if (props.onChange) {
      props.onChange(query);
    }

  }

  return (
    <View>
      <TextInput onChangeText={handleText}
        value={query}
        placeholder='Search Coin'
        placeholderTextColor='#fff'
        style={[styles.textInput, Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: '#fff'
  },
  textInputAndroid: {
    borderWidth: 2,
    borderBottomColor: Colors.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
});

export default CoinsSearch;
