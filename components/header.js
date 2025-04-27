import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,SafeAreaView, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 48; // altura aproximada de cada opción
const ITEM_COUNT = 4;

export default function Header() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [open]);

  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ITEM_COUNT * ITEM_HEIGHT], // dinámico según número de items
  });
  const dropdownOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={styles.headerWrapper} pointerEvents="box-none">
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
            <Image source={require('../assets/logo-aigua.png')} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.menuButton}>
          <Text style={styles.menuIcon}>{open ? '✕' : '☰'}</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.dropdown, { height: dropdownHeight, opacity: dropdownOpacity }]}>  
        <TouchableOpacity onPress={() => { setOpen(false); navigation.navigate('Investments'); }} style={styles.item}>
          <Text style={styles.link}>Inversió</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setOpen(false); navigation.navigate('Water'); }} style={styles.item}>
          <Text style={styles.link}>Potabilitat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setOpen(false); navigation.navigate('Table'); }} style={styles.item}>
          <Text style={styles.link}>Despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setOpen(false); navigation.navigate('Contact'); }} style={styles.item}>
          <Text style={styles.link}>Contacte</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFFAEB',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#110E2F',
  },
  logoContainer: {
    marginLeft: 16,
    marginBottom: 8,
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  dropdown: {
    top: 72, 
    left: 0,
    width: width,
    backgroundColor: '#FFFAEB',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  link: {
    color: '#110E2F',
    fontWeight: '600',
    fontSize: 16,
  },
});