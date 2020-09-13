import React from 'react';
import { View, Text, Pressable } from 'react-native';

const CoinDetailScreen = (props) => {

  const handlePress = () => {
    props.navigation.goBack('Coins')
  }
  return (

    <View>
      <Text>
        Coin Detail Screen
          </Text>
      <Text>
        Coin Detail Screen
          </Text>
      <Pressable onPress={handlePress}>
        <Text>
          Coin Detail Screen
          </Text>
      </Pressable>
    </View>

  );
}

export default CoinDetailScreen;