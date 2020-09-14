import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import { State, Directions, FlingGestureHandler } from 'react-native-gesture-handler';
import Http from '../../libraries/http';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';
import Colors from '../../resources/colors';

const CoinsScreen = (props) => {

  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoins = async () => {
    const response = await Http.instance.get('https://api.coinlore.net/api/tickers/');
    setCoins(response.data);
    setAllCoins(response.data);
    setLoading(false);
    // console.log(coins)
  }
  useEffect(() => {
    getCoins();
  }, []);

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', { coin });
  }

  const handleSearch = (query) => {
    const coinsFiltered = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase());
    });

    setCoins(coinsFiltered);
  }

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ?
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        : null
      }
      <FlatList
        data={coins}
        renderItem={({ item }) =>
          <CoinsItem
            item={item}
            onPress={() => handlePress(item)}
          />
        }
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f7f7f7",
    backgroundColor: Colors.charade,
    justifyContent: "center",

  },
  btn: {
    padding: 8,
    backgroundColor: "#5971b5",
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: "#fff",
    textAlign: "center"
  },
  loader: {
    alignSelf: "center",
    marginTop: "90%"
  },
});

export default CoinsScreen;