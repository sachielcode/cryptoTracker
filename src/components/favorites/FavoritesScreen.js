import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../resources/colors';


const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState />
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
