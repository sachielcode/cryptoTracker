import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from './src/resources/colors';

const Tabs = createBottomTabNavigator();

const App = () => {

	return (
		<NavigationContainer>
			<Tabs.Navigator
				tabBarOptions={{
					tintColor: "#fefefe",
					style: {
						backgroundColor: Colors.blackPearl
					}
				}}
			>
				<Tabs.Screen
					name="Coins"
					component={CoinsStack}
					options={{
						tabBarIcon: ({ size, color }) => (
							<Image
								style={{ tintColor: color, width: size, height: size }}
								source={require('./src/assets/bank.png')}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="Favorites"
					component={FavoritesStack}
					options={{
						tabBarIcon: ({ size, color }) => (
							<Image
								style={{ tintColor: color, width: size, height: size }}
								source={require('./src/assets/star.png')}
							/>
						)
					}}
				/>
			</Tabs.Navigator>
		</NavigationContainer>
	);
};



export default App;
