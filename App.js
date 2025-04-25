import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LandingScreen from './components/LandingScreen';
import InvestmentsScreen from './components/InvestmentsScreen';

// Placeholder components for future implementation
const WaterScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Water Screen</Text></View>;
const TableScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Table Screen</Text></View>;
const ContactScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Contact Screen</Text></View>;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Landing');
  const [prevScreen, setPrevScreen] = useState(null);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const navigate = (screenName) => {
    if (currentScreen !== screenName) {
      setPrevScreen(currentScreen);
      
      // Fade out current screen
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // Change screen
        setCurrentScreen(screenName);
        
        // Fade in new screen
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  // Render the appropriate screen based on the current state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Landing':
        return <LandingScreen navigation={{ navigate }} />;
      case 'Investments':
        return <InvestmentsScreen navigation={{ navigate }} />;
      case 'Water':
        return <WaterScreen />;
      case 'Table':
        return <TableScreen />;
      case 'Contact':
        return <ContactScreen />;
      default:
        return <LandingScreen navigation={{ navigate }} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {renderScreen()}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFAEB',
  },
  container: {
    flex: 1,
    paddingTop: 15, // Extra padding to account for notches and camera cutouts
  },
}); 