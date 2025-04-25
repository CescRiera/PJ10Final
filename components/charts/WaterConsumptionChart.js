import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const WaterConsumptionChart = () => {
  // Data for water consumption across different African regions over time
  const data = {
    labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
    datasets: [
      {
        data: [21, 24, 28, 32, 35, 37],
        color: (opacity = 1) => `rgba(229, 155, 80, ${opacity})`, // #E59B50
        strokeWidth: 2,
        label: 'Nord d\'Àfrica'
      },
      {
        data: [18, 20, 22, 25, 28, 30],
        color: (opacity = 1) => `rgba(115, 204, 212, ${opacity})`, // #73CCD4
        strokeWidth: 2,
        label: 'Àfrica Subsahariana'
      },
      {
        data: [19.5, 22, 25, 28.5, 31.5, 34],
        color: (opacity = 1) => `rgba(65, 51, 221, ${opacity})`, //rgb(65, 51, 221)
        strokeWidth: 2,
        label: 'Mitjana General'
      }
    ],
    legend: ['Nord d\'Àfrica', 'Àfrica Subsahariana', 'Mitjana General']
  };

  const chartConfig = {
    backgroundColor: '#110E2F',
    backgroundGradientFrom: '#110E2F',
    backgroundGradientTo: '#110E2F',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 250, 235, ${opacity})`, // #FFFAEB
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
        legend={data.legend}
        renderDotContent={({ x, y, indexData, index, dataset }) => {
          // Check if dataset and dataset.color exist before using them
          if (!dataset || typeof dataset.color !== 'function') {
            return null;
          }
          
          return (
            <View key={index} style={{
              position: 'absolute',
              top: y - 12,
              left: x - 12,
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {index === 5 && (
                <Text style={{ 
                  fontSize: 9, 
                  color: dataset.color(1),
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(65, 51, 221, 1)',
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                }}>
                  {indexData}L
                </Text>
              )}
            </View>
          );
        }}
      />
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
  }
});

export default WaterConsumptionChart; 