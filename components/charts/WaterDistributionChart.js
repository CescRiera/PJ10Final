import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const WaterDistributionChart = () => {
  const data = [
    {
      name: 'Rural',
      population: 40,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Urbà',
      population: 60,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribució de l'Accés a l'Aigua</Text>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default WaterDistributionChart; 