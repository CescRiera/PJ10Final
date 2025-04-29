import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ChallengeItem = ({ icon, title, description, difficulty, index }) => {
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, []);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Fàcil':
        return '#4CAF50';
      case 'Mitjà':
        return '#FF9800';
      case 'Difícil':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  };

  return (
    <Animated.View style={[styles.challengeItem, { transform: [{ scale: scaleAnim }] }]}>
      <View style={[styles.iconContainer, { backgroundColor: `${getDifficultyColor()}20` }]}>
        <MaterialIcons name={icon} size={28} color={getDifficultyColor()} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.challengeTitle}>{title}</Text>
        <Text style={styles.challengeDescription}>{description}</Text>
        <View style={styles.difficultyContainer}>
          <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
            {difficulty}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const WaterChallenges = () => {
  const challenges = [
    {
      icon: 'water-drop',
      title: 'Dutxa de 5 Minuts',
      description: 'Redueix el temps de dutxa a només 5 minuts per estalviar aigua i reduir el consum',
      difficulty: 'Fàcil',
    },
    {
      icon: 'eco',
      title: 'Recicla l\'Aigua',
      description: 'Reutilitza l\'aigua de la cuina per regar les plantes durant una setmana sencera',
      difficulty: 'Mitjà',
    },
    {
      icon: 'build',
      title: 'Reparació de Fuites',
      description: 'Identifica i repara totes les fuites d\'aigua a casa teva per evitar el malbaratament',
      difficulty: 'Difícil',
    },
    {
      icon: 'opacity',
      title: 'Control del Consum',
      description: 'Registra el teu consum diari d\'aigua durant una setmana per prendre consciència',
      difficulty: 'Mitjà',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reptes d\'Estalvi d\'Aigua</Text>
      {challenges.map((challenge, index) => (
        <ChallengeItem
          key={index}
          icon={challenge.icon}
          title={challenge.title}
          description={challenge.description}
          difficulty={challenge.difficulty}
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
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  difficultyContainer: {
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default WaterChallenges; 