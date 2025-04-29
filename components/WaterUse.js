import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import WaterAccessChart from './WaterAccessChart';
import WaterDistributionChart from './WaterDistributionChart';
import RegionalComparisonChart from './RegionalComparisonChart';
import WaterStats from './WaterStats';
import WaterDataTable from './WaterDataTable';
import WaterChallenges from './WaterChallenges';
import WaterTips from './WaterTips';
import Header from './Header';
import Footer from './Footer';

const WaterUse = () => {
  return (
    <View style={styles.container}>
      <Header title="Accés a l'Aigua a l'Àfrica" />
      <ScrollView style={styles.content}>
        <WaterAccessChart />
        <WaterDistributionChart />
        <RegionalComparisonChart />
        <WaterStats />
        <WaterDataTable />
        <WaterChallenges />
        <WaterTips />
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default WaterUse; 