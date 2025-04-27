import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './components/LandingScreen';
import InvestmentsScreen from './components/InvestmentsScreen';
import Header from './components/header';

const WaterScreen = () => (
  <View style={styles.placeholder}>
    <Text>Water Screen</Text>
  </View>
);
const TableScreen = () => (
  <View style={styles.placeholder}>
    <Text>Table Screen</Text>
  </View>
);
const ContactScreen = () => (
  <View style={styles.placeholder}>
    <Text>Contact Screen</Text>
  </View>
);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <SafeAreaView style={styles.safeArea}>
        <Header />
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Landing">
            {props => <LandingScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Investments">
            {props => <InvestmentsScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Water" component={WaterScreen} />
          <Stack.Screen name="Table" component={TableScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFAEB',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#FFFAEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
