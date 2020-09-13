import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import Colors from '../../resources/colors';

const CoinsItem = ({ item }) => {

  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require("../../assets/arrow_up.png");
    } else {
      return require("../../assets/arrow_down.png");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image
          source={getImageArrow()}
          style={styles.arrow}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 2,
    marginLeft: Platform.OS === 'android' ? 16 : 0
  },
  row: {
    flexDirection: "row"
  },
  symbolText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 12
  },
  nameText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 12
  },
  priceText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 16
  },
  percentText: {
    color: "#fff",
    fontSize: 12,
    marginRight: 12,
    marginRight: 8
  },
  arrow: {
    width: 18,
    height: 18,
  }
});

export default CoinsItem;