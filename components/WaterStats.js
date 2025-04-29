import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatItem = ({ title, value, color = '#2196F3' }) => (
  <View style={styles.statItem}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const WaterStats = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadístiques Clau</Text>
      <View style={styles.statsContainer}>
        <StatItem 
          title="Població amb Accés" 
          value="82%" 
          color="#2196F3"
        />
        <StatItem 
          title="Fonts Millorades" 
          value="75%" 
          color="#4CAF50"
        />
        <StatItem 
          title="Temps Mitjà d'Accés" 
          value="30 min" 
          color="#FF9800"
        />
        <StatItem 
          title="Qualitat de l'Aigua" 
          value="Bona" 
          color="#9C27B0"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    paddingTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  statItem: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default WaterStats; 