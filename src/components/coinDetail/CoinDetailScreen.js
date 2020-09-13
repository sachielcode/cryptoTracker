import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList } from 'react-native';
import Http from '../../libraries/http';
import Colors from '../../resources/colors';
import CoinMarketItem from './CoinMarketItem';

const CoinDetailScreen = (props) => {

  const [coin, setCoin] = useState({});
  const [image, setImage] = useState('');
  const [sections, setSections] = useState([]);
  const [markets, setMarkets] = useState([]);

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const response = await Http.instance.get(url);
    setMarkets(response);
  }

  useEffect(() => {
    const { coin } = props.route.params;
    props.navigation.setOptions({ title: coin.symbol });

    getMarkets(coin.id);
    setCoin(coin);
    setSections(getSections(coin));

  }, []);

  const getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(" ", "-");

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`
    }
  }

  const handlePress = () => {
    props.navigation.goBack('Coins')
  }

  const getSections = (coin) => {
    const sections = [
      {
        title: "Market cap",
        data: [coin.market_cap_usd]
      },
      {
        title: "Volume 24hr",
        data: [coin.volume24]
      },
      {
        title: "Change 24hr",
        data: [coin.percent_change_24h]
      }
    ];

    return sections;
  }


  return (

    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image style={styles.iconImg} source={{ uri: getSymbolIcon(coin.name) }} />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>
      <SectionList
        style={styles.section}
        sections={sections}
        keyExtractor={(item) => item}
        renderItem={({ item }) =>
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        }
        renderSectionHeader={({ section }) =>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        }
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        data={markets}
        horizontal={true}
        renderItem={({ item }) =>
          <CoinMarketItem item={item} />
        }
      />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  subHeader: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  },
  iconImg: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: "rgba(0,0,0, 0.2)",
    padding: 8
  },
  sectionText: {
    color: "#fff"
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  },
  list: {
    maxHeight: 80,
    paddingLeft: 16
  },
  marketsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center"
  }
});

export default CoinDetailScreen;