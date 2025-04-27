import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

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

const CSV_DATA = [
  { id: 1, pais: 'Nigeria', consum: '50', poblacio: '206' },
  { id: 2, pais: 'South Africa', consum: '220', poblacio: '59' },
  { id: 3, pais: 'Egypt', consum: '300', poblacio: '104' },
  { id: 4, pais: 'Kenya', consum: '90', poblacio: '54' },
  { id: 5, pais: 'Ghana', consum: '70', poblacio: '31' },
  { id: 6, pais: 'Ethiopia', consum: '40', poblacio: '115' },
  { id: 7, pais: 'Morocco', consum: '100', poblacio: '37' },
  { id: 8, pais: 'Algeria', consum: '120', poblacio: '43' },
  { id: 9, pais: 'Tanzania', consum: '60', poblacio: '60' },
  { id: 10, pais: 'Uganda', consum: '55', poblacio: '46' },
];

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

    SQLite.openDatabaseAsync('waterConsumption.db').then(db => {
      db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS consums (
          id INTEGER PRIMARY KEY NOT NULL,
          pais TEXT NOT NULL,
          consum TEXT,
          poblacio TEXT
        );
      `).then(() => {
        this.insertarDadesCSV(db);
      }).catch(error => {
        this.handleError('Error al crear tabla', error);
      });
    }).catch(error => {
      this.handleError('Error al abrir la base de datos', error);
    });
  }

  insertarDadesCSV = async (db) => {
    try {
      const result = await db.getAllAsync('SELECT COUNT(*) as count FROM consums');
      if (result[0].count === 0) {
        await Promise.all(CSV_DATA.map(item => 
          db.runAsync(
            'INSERT OR IGNORE INTO consums (id, pais, consum, poblacio) VALUES (?, ?, ?, ?)',
            [item.id, item.pais, item.consum, item.poblacio]
          )
        ));
      }
      this.obtenirDades(db);
    } catch (error) {
      this.handleError('Error insertando datos', error);
    }
  }

  obtenirDades = async (db) => {
    try {
      const resultat = await db.getAllAsync('SELECT * FROM consums');
      this.setState({ dades: resultat, carregant: false });
    } catch (error) {
      this.handleError('Error obteniendo datos', error);
    }
  }

  handleError = (missatge, error) => {
    console.log(error);
    this.setState({ error: missatge, carregant: false });
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