import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { Asset } from 'expo-asset';

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAEB',
  },
  textPeu: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  peu: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FCD34D'
  },
  taula: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  capcalera: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fila: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  columnaRank: {
    flex: 0.5,
    paddingHorizontal: 10,
  },
  columnaPais: {
    flex: 2,
    paddingHorizontal: 10,
  },
  columnaConsum: {
    flex: 1,
    paddingHorizontal: 10,
  },
  columnaPoblacio: {
    flex: 1,
    paddingHorizontal: 10,
  },
  textColumna: {
    fontSize: 16,
    textAlign: 'center',
  },
  textCapcalera: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filtre: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  }
});

export class WaterConsumptionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dades: [],
      filtre: '',
      carregant: true,
      error: null
    };
  }

  componentDidMount() {
    if (Platform.OS === 'web') {
      this.setState({ error: 'SQLite no está soportado en web', carregant: false });
      return;
    }

    this.carregarDadesCSV();
  }

  carregarDadesCSV = async () => {
    try {
      // Get the path to the document directory
      const documentDirectory = FileSystem.documentDirectory;
      const csvPath = documentDirectory + 'waterconsum.csv';

      // Check if the file exists in the document directory


      // Now read the CSV file
      const csvContent = await FileSystem.readAsStringAsync(csvPath);
      
      Papa.parse(csvContent, {
        header: true,
        complete: (results) => {
          // Once we have the CSV data, initialize SQLite and insert the data
          SQLite.openDatabaseAsync('waterconsumption.db').then(db => {
            // First create the table
            db.execAsync(`
              PRAGMA journal_mode = WAL;
              CREATE TABLE IF NOT EXISTS water_consumption (
                id INTEGER PRIMARY KEY NOT NULL,
                pais TEXT NOT NULL,
                consum INTEGER,
                poblacio INTEGER
              );
            `).then(() => {
              // Then insert the data from CSV
              const insertPromises = results.data.map(item => 
                db.runAsync('INSERT OR IGNORE INTO water_consumption (id, pais, consum, poblacio) VALUES (?, ?, ?, ?)',
                  [parseInt(item.id), item.pais, parseInt(item.consum), parseInt(item.poblacio)])
              );

              Promise.all(insertPromises).then(() => {
                // After inserting, read and display the data
                db.getAllAsync('SELECT * FROM water_consumption ORDER BY id').then((resultat) => {
                  this.setState({ dades: resultat, carregant: false });
                  
                  // Log to console
                  for (const item of resultat) {
                    console.log(item.id, item.pais, item.consum, item.poblacio);
                  }
                }).catch(error => {
                  console.log(error);
                  this.setState({ error: 'Error al consultar dades', carregant: false });
                });
              }).catch(error => {
                console.log(error);
                this.setState({ error: 'Error al insertar dades', carregant: false });
              });
            }).catch(error => {
              console.log(error);
              this.setState({ error: 'Error al crear taula', carregant: false });
            });
          }).catch(error => {
            console.log(error);
            this.setState({ error: 'Error al obrir base de dades', carregant: false });
          });
        },
        error: (error) => {
          this.setState({ error: 'Error al parsear CSV', carregant: false });
        }
      });
    } catch (error) {
      console.error('Error loading CSV:', error);
      this.setState({ error: 'Error al cargar el archivo CSV: ' + error.message, carregant: false });
    }
  }

  handleFiltre = (text) => {
    this.setState({ filtre: text });
  }

  getDadesFiltrades = () => {
    return this.state.dades.filter(item =>
      item.pais.toLowerCase().includes(this.state.filtre.toLowerCase())
    );
  }

  render() {
    const { carregant, error, filtre } = this.state;
    const dadesFiltrades = this.getDadesFiltrades();

    if (Platform.OS === 'web') {
      return (
        <View style={estils.contenidor}>
          <Text>{this.state.error}</Text>
        </View>
      );
    }

    return (
      <View style={estils.contenidor}>
        <View style={estils.peu}>
          <Text style={estils.textPeu}>CONSUMO DE AGUA</Text>
        </View>

        <TextInput
          style={estils.filtre}
          placeholder="Filtrar por país"
          value={filtre}
          onChangeText={this.handleFiltre}
        />

        {carregant && <Text>Cargando datos...</Text>}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}

        {!carregant && !error && (
          <ScrollView>
            <View style={estils.taula}>
              <View style={estils.capcalera}>
                <Text style={[estils.columnaRank, estils.textCapcalera]}>Rank</Text>
                <Text style={[estils.columnaPais, estils.textCapcalera]}>País</Text>
                <Text style={[estils.columnaConsum, estils.textCapcalera]}>Agua (L)</Text>
                <Text style={[estils.columnaPoblacio, estils.textCapcalera]}>Población (M)</Text>
              </View>

              {dadesFiltrades.length > 0 ? (
                dadesFiltrades.map((item) => (
                  <View key={item.id} style={estils.fila}>
                    <Text style={[estils.columnaRank, estils.textColumna]}>{item.id}</Text>
                    <Text style={[estils.columnaPais, estils.textColumna]}>{item.pais}</Text>
                    <Text style={[estils.columnaConsum, estils.textColumna]}>{item.consum}</Text>
                    <Text style={[estils.columnaPoblacio, estils.textColumna]}>{item.poblacio}</Text>
                  </View>
                ))
              ) : (
                <Text style={{ padding: 10 }}>No se encontraron resultados</Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
export default WaterConsumptionTable;