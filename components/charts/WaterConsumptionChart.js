import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const WaterConsumptionChart = () => {
  const data = {
    labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
    datasets: [
      {
        data: [21, 24, 28, 32, 35, 37],
        color: (opacity = 1) => `rgba(229, 155, 80, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [18, 20, 22, 25, 28, 30],
        color: (opacity = 1) => `rgba(115, 204, 212, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [19.5, 22, 25, 28.5, 31.5, 34],
        color: (opacity = 1) => `rgba(65, 51, 221, ${opacity})`,
        strokeWidth: 2,
      }
    ],
  };

  const chartConfig = {
    backgroundColor: '#110E2F',
    backgroundGradientFrom: '#110E2F',
    backgroundGradientTo: '#110E2F',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 250, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 250, 235, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#110E2F'
    },
    propsForLabels: {
      fontSize: 10
    },
    formatYLabel: (value) => `${value}L`,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consum d'aigua per persona (Litres/dia)</Text>
      <LineChart
        data={data}
        width={width - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        verticalLabelRotation={0}
        fromZero
        withInnerLines={true}
        withOuterLines={true}
        withShadow={false}
        segments={5}
        yAxisSuffix="L"
        yAxisInterval={5}
      />

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#E59B50' }]} />
          <Text style={styles.legendText}>Nord d'Àfrica</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#73CCD4' }]} />
          <Text style={styles.legendText}>Àfrica Subsahariana</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'rgb(65, 51, 221)' }]} />
          <Text style={styles.legendText}>Mitjana General</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: '#FFFAEB',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
    marginLeft: 3,
  },
  legendText: {
    color: '#FFFAEB',
    fontSize: 12,
  }
});

export default WaterConsumptionChart;
