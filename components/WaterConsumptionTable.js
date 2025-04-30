import React, { useState, useEffect } from 'react';
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

const WaterConsumptionTable = () => {
    const [dades, setDades] = useState([]);
    const [filtre, setFiltre] = useState('');
    const [carregant, setCarregant] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (Platform.OS === 'web') {
            setError('SQLite no está soportado en web');
            setCarregant(false);
            return;
        }

        (async () => {
            try {
                const db = await SQLite.openDatabaseAsync('waterconsumption.db');
                await carregarDadesCSV(db);
            } catch (e) {
                setError(`Error abriendo la base de datos: ${e.message}`);
                setCarregant(false);
            }
        })();
    }, []);

    const carregarDadesCSV = async (db) => {
        try {
            const asset = Asset.fromModule(require('../assets/waterconsum.csv'));
            await asset.downloadAsync();
            const csvUri = asset.localUri || asset.uri;
            const csvContent = await FileSystem.readAsStringAsync(csvUri);

            const { data } = Papa.parse(csvContent, { header: true });

            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS water_consumption (
                    id INTEGER PRIMARY KEY NOT NULL,
                    pais TEXT NOT NULL,
                    consum INTEGER,
                    poblacio INTEGER
                );
            `);

            for (const item of data) {
                if (item.id) {
                    await db.runAsync(
                        'INSERT OR IGNORE INTO water_consumption (id, pais, consum, poblacio) VALUES (?, ?, ?, ?)',
                        [parseInt(item.id), item.pais, parseInt(item.consum), parseInt(item.poblacio)]
                    );
                }
            }

            const rows = await db.getAllAsync('SELECT * FROM water_consumption ORDER BY id');
            setDades(rows);
        } catch (err) {
            console.error('Error loading CSV:', err);
            setError('Error al cargar el archivo CSV: ' + err.message);
        } finally {
            setCarregant(false);
        }
    };

    const handleFiltre = (text) => setFiltre(text);

    const dadesFiltrades = dades.filter(item =>
        item.pais.toLowerCase().includes(filtre.toLowerCase())
    );

    if (Platform.OS === 'web') {
        return (
            <View style={estils.contenidor}>
                <Text>{error}</Text>
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
                onChangeText={handleFiltre}
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
                            dadesFiltrades.map(item => (
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
};

export default WaterConsumptionTable;
