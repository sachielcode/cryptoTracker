import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../coins/CoinsItem';
import Colors from '../../resources/colors';
import Storage from '../../libraries/storage';

const FavoritesScreen = (props) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
    props.navigation.addListener('focus', getFavorites);
    return () => {
      props.navigation.removeListener('focus', getFavorites);
    };
  }, []);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      setFavorites(favs.map((key) => JSON.parse(key[1])))
      console.log(favorites);
    } catch (error) {
      console.log('get favorites error', error);
    }
  }
  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', { coin });
  }

  return (
    <View style={styles.container}>
      {favorites.length == 0 ? <FavoritesEmptyState /> : null}
      { favorites.length > 0 ? <FlatList
        data={favorites}
        renderItem={({ item }) =>
          <CoinsItem
            item={item}
            onPress={() => handlePress(item)}
          />
        }
      />
        : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  }
})

export default FavoritesScreen;
