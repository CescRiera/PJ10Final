import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const InvestmentTrendsChart = () => {
  // Data for investment trends in different sectors
  const data = {
    labels: ['Aigua', 'Salut', 'Agricul.', 'Energia', 'Educació'],
    datasets: [
      {
        data: [48, 32, 38, 54, 29],
        colors: [
          (opacity = 1) => `rgba(115, 204, 212, ${opacity})`, // #73CCD4
          (opacity = 1) => `rgba(229, 155, 80, ${opacity})`, // #E59B50
          (opacity = 1) => `rgba(17, 14, 47, ${opacity})`, // #110E2F
          (opacity = 1) => `rgba(180, 236, 255, ${opacity})`, // #B4ECFF
          (opacity = 1) => `rgba(255, 103, 94, ${opacity})`, // #FF675E
        ]
      }
    ]
  };

  const chartConfig = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backgroundGradientFrom: 'rgba(255, 255, 255, 0.5)',
    backgroundGradientTo: 'rgba(255, 255, 255, 0.5)',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(17, 14, 47, ${opacity * 0.9})`,
    labelColor: (opacity = 1) => `rgba(17, 14, 47, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
    barRadius: 5,
    propsForLabels: {
      fontSize: 10,
    },
    formatYLabel: (value) => `${value}B€`,
  };

  // Custom rendering function for data labels on top of bars
  const renderBarTopLabels = ({ data, width, height, paddingRight, paddingTop, barWidth }) => {
    return data.map((x, i) => {
      const barHeight = height * (x / Math.max(...data));
      const barX = paddingRight + (i * barWidth);
      return (
        <Text
          key={i}
          style={{
            position: 'absolute',
            top: height - barHeight - 16,
            left: barX + barWidth / 4,
            width: barWidth,
            fontSize: 10,
            fontWeight: 'bold',
            color: 'rgba(17, 14, 47, 0.8)'
          }}
        >
          {`${x}B€`}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inversió per Sector (Milers de Milions €)</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={width - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showBarTops={false}
          showValuesOnTopOfBars={true}
          withInnerLines={false}
          segments={5}
          yAxisSuffix="B€"
          yAxisLabel=""
          flatColor={true}
          withCustomBarColorFromData={true}
        />
        {renderBarTopLabels({
          data: data.datasets[0].data,
          width: width - 40,
          height: 180,
          paddingRight: 55,
          paddingTop: 16,
          barWidth: (width - 120) / data.labels.length
        })}
      </View>
      
      {/* Legend for regions */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItemContainer}>
          <View style={[styles.legendColor, { backgroundColor: '#73CCD4' }]} />
          <Text style={styles.legendText}>2020-2023</Text>
        </View>
        <View style={styles.legendItemContainer}>
          <View style={[styles.legendColor, { backgroundColor: '#E59B50' }]} />
          <Text style={styles.legendText}>2024-2025 (Projectat)</Text>
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
    color: 'rgba(17, 14, 47, 0.9)',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    position: 'relative',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  legendItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: 'rgba(17, 14, 47, 0.8)',
  },
});

export default InvestmentTrendsChart; 