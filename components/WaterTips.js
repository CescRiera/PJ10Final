import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TipItem = ({ icon, title, description, index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.tipItem, { opacity: fadeAnim }]}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={28} color="#4CAF50" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.tipTitle}>{title}</Text>
        <Text style={styles.tipDescription}>{description}</Text>
      </View>
    </Animated.View>
  );
};

const WaterTips = () => {
  const tips = [
    {
      icon: 'water-drop',
      title: 'Conservació de l\'Aigua',
      description: 'Tanca el grif mentre et rentes les dents o et rasques per estalviar aigua',
    },
    {
      icon: 'shower',
      title: 'Dutxes Eficients',
      description: 'Redueix el temps de dutxa i utilitza cabots d\'estalvi per reduir el consum',
    },
    {
      icon: 'local-laundry-service',
      title: 'Rentat Inteligent',
      description: 'Utilitza la rentadora només amb càrregues completes per optimitzar l\'ús d\'aigua',
    },
    {
      icon: 'eco',
      title: 'Reciclatge d\'Aigua',
      description: 'Reutilitza l\'aigua de la cuina per regar les plantes i aprofita els recursos',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consells per l\'Estalvi d\'Aigua</Text>
      {tips.map((tip, index) => (
        <TipItem
          key={index}
          icon={tip.icon}
          title={tip.title}
          description={tip.description}
          index={index}
        />
      ))}
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    paddingTop: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default WaterTips; 