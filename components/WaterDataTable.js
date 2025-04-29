import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TableRow = ({ region, access, quality, time }) => (
  <View style={styles.row}>
    <Text style={[styles.cell, styles.regionCell]}>{region}</Text>
    <Text style={[styles.cell, styles.dataCell]}>{access}</Text>
    <Text style={[styles.cell, styles.dataCell]}>{quality}</Text>
    <Text style={[styles.cell, styles.dataCell]}>{time}</Text>
  </View>
);

const WaterDataTable = () => {
  const data = [
    { region: 'Nord', access: '75%', quality: 'Bona', time: '45 min' },
    { region: 'Sud', access: '85%', quality: 'Excel·lent', time: '20 min' },
    { region: 'Est', access: '65%', quality: 'Regular', time: '60 min' },
    { region: 'Oest', access: '70%', quality: 'Bona', time: '35 min' },
    { region: 'Centre', access: '80%', quality: 'Bona', time: '30 min' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dades per Regió</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.regionCell]}>Regió</Text>
            <Text style={[styles.headerCell, styles.dataCell]}>Accés</Text>
            <Text style={[styles.headerCell, styles.dataCell]}>Qualitat</Text>
            <Text style={[styles.headerCell, styles.dataCell]}>Temps</Text>
          </View>
          {data.map((item, index) => (
            <TableRow
              key={index}
              region={item.region}
              access={item.access}
              quality={item.quality}
              time={item.time}
            />
          ))}
        </View>
      </ScrollView>
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
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#2196F3',
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  cell: {
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  regionCell: {
    width: 100,
  },
  dataCell: {
    width: 80,
  },
});

export default WaterDataTable; 