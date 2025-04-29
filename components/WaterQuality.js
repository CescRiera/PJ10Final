import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import WaterStats from './WaterStats';
import WaterTips from './WaterTips';
import WaterChallenges from './WaterChallenges';
import WaterAccessChart from './charts/WaterAccessChart';
import WaterDistributionChart from './charts/WaterDistributionChart';

const WaterQuality = () => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Qualitat de l'Aigua</Text>
        <Text style={styles.sectionDescription}>
          La qualitat de l'aigua és un aspecte fonamental per a la salut pública i el benestar de la comunitat. 
          A continuació, trobareu informació sobre l'accés, distribució i consells per millorar la gestió de l'aigua.
        </Text>
      </View>

      <View style={styles.section}>
        <WaterStats />
      </View>

      <View style={styles.section}>
        <WaterAccessChart />
      </View>

      <View style={styles.section}>
        <WaterDistributionChart />
      </View>

      <View style={styles.section}>
        <WaterTips />
      </View>

      <View style={styles.section}>
        <WaterChallenges />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default WaterQuality; 