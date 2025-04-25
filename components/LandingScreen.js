import React, { useRef, useEffect } from 'react';
import { 
  SafeAreaView,
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Animated, 
  Dimensions 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WaterConsumptionChart from './charts/WaterConsumptionChart';

const LandingScreen = ({ navigation }) => {
  // Animation references
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;
  const fadeAnim5 = useRef(new Animated.Value(0)).current;

  // Topics data equivalent to the Angular temas array
  const topics = [
    {
      title: 'Inversió',
      body: 'La inversió és clau per garantir el creixement sostenible i maximitzar els beneficis a llarg termini. Una bona estratègia d\'inversió permet mitigar riscos i充分利用机会在不同的市场中，提高投资回报率。",',
      link: 'Investments',
      image: require('../assets/inversio.png') // You'll need to place these images in your assets folder
    },
    {
      title: 'Potabilitat',
      body: 'Els processos de tractament de l\'aigua asseguren la seva qualitat i eliminen els contaminants per a un ús segur. Aquests processos impliquen una sèrie de tècniques d\'anàlisi i purificació que garanteixen que l\'aigua compleixi amb els estàndards de seguretat i qualitat, evitant problemes de salut pública.',
      link: 'Water',
      image: require('../assets/gota.png')
    },
    {
      title: 'Despesa',
      body: 'Una bona gestió de la despesa permet mantenir l\'equilibri financer i optimitzar els recursos disponibles. Implementar controls rigorosos sobre la despesa ajuda a evitar despeses innecessàries i a dirigir els recursos cap a àrees de creixement i rendiment òptim.',
      link: 'Table',
      image: require('../assets/despeses.png')
    }
  ];

  // Start animations on component mount
  useEffect(() => {
    const timings = [200, 500, 800, 1100, 1400];
    
    timings.forEach((timing, index) => {
      setTimeout(() => {
        Animated.timing(
          [fadeAnim1, fadeAnim2, fadeAnim3, fadeAnim4, fadeAnim5][index],
          {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }
        ).start();
      }, timing);
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="light" />
      
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Animated.View style={[styles.heroContent, { opacity: fadeAnim1, transform: [{ translateY: fadeAnim1.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })}] }]}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>T'informem sobre l'escassetat d'aigua a l'Àfrica</Text>
          </View>
          <Text style={styles.heroTitle}>Crisi d'Aigua a Àfrica: Urgència i Acció per un Futur Sostenible</Text>
          <Text style={styles.heroQuote}>"L'aigua és vida, i l'accés a l'aigua neta és un dret humà fonamental." — Kofi Annan</Text>
          
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => navigation.navigate('Investments')}
          >
            <Text style={styles.heroButtonText}>Aprèn més sobre el tema</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View style={{ opacity: fadeAnim2, transform: [{ translateY: fadeAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })}] }}>
          <Image 
            source={require('../assets/hero-banner-image.png')} 
            style={styles.heroImage} 
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      
      {/* Water Consumption Section */}
      <View style={styles.consumptionSection}>
        <Animated.View style={[styles.consumptionContent, { opacity: fadeAnim3, transform: [{ translateY: fadeAnim3.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })}] }]}>
          <Text style={styles.consumptionTag}>Desigualtat i reptes en l'accés a l'aigua potable</Text>
          <Text style={styles.consumptionTitle}>El consum d'aigua per persona a l'Àfrica: Una anàlisi visual</Text>
          <Text style={styles.consumptionText}>
            L'accés a l'aigua a l'Àfrica varia dràsticament entre regions, reflectint diferències en
            infraestructura, clima i desenvolupament econòmic. Mentre que en algunes zones urbanes el consum pot
            superar els 50 litres diaris per persona, en moltes comunitats rurals la xifra és molt inferior,
            sovint per sota dels 20 litres. Aquesta situació posa en evidència la necessitat d'inversions
            en recursos hídrics per garantir un accés equitatiu a aquest recurs essencial.
          </Text>
        </Animated.View>
        
        {/* Water Consumption Chart */}
        <Animated.View style={{ opacity: fadeAnim3, transform: [{ translateY: fadeAnim3.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })}] }}>
          <WaterConsumptionChart />
        </Animated.View>
        
        <Animated.View style={[styles.statsContainer, { opacity: fadeAnim4, transform: [{ translateY: fadeAnim4.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })}] }]}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#E59B50' }]}>37 L/dia</Text>
            <Text style={styles.statLabel}>Àfrica del Nord (2025)</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#73CCD4' }]}>30 L/dia</Text>
            <Text style={styles.statLabel}>Àfrica Subsahariana (2025)</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#110E2F' }]}>+12 L/dia</Text>
            <Text style={styles.statLabel}>Increment (2000-2025)</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#E59B50' }]}>34 L/dia</Text>
            <Text style={styles.statLabel}>Mitjana General (2025)</Text>
          </View>
        </Animated.View>
      </View>
      
      {/* Topics Section */}
      <View style={styles.topicsSection}>
        <Animated.View style={{ opacity: fadeAnim5, transform: [{ translateY: fadeAnim5.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })}] }}>
          <Text style={styles.topicsTag}>Temes rellevants</Text>
          <Text style={styles.topicsTitle}>Apren sobre l'escasetat d'aigua a l'Àfrica</Text>
          
          <View style={styles.topicsGrid}>
            {topics.map((topic, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.topicCard}
                onPress={() => navigation.navigate(topic.link)}
              >
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Image source={topic.image} style={styles.topicImage} resizeMode="contain" />
                <Text style={styles.topicBody}>{topic.body}</Text>
                <Text style={styles.topicLink}>Aprèn més</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
      
      {/* Footer would go here */}
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73CCD4',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  heroSection: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10, // Extra top margin for notch
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#110E2F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  tagText: {
    color: '#FFFAEB',
    fontWeight: '500',
    fontSize: 14,
  },
  heroTitle: {
    fontSize: Math.min(28, width * 0.07), // Responsive font size
    fontWeight: 'bold',
    color: '#110E2F',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: Math.min(34, width * 0.085), // Responsive line height
  },
  heroQuote: {
    fontStyle: 'italic',
    color: '#110E2F',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: Math.min(16, width * 0.04), // Responsive font size
  },
  heroButton: {
    backgroundColor: '#110E2F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
    elevation: 4, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  heroButtonText: {
    color: '#FFFAEB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroImage: {
    width: Math.min(width * 0.8, 400),
    height: Math.min(200, height * 0.25),
  },
  consumptionSection: {
    backgroundColor: '#110E2F',
    padding: 20,
  },
  consumptionContent: {
    marginBottom: 20,
  },
  consumptionTag: {
    color: '#E59B50',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  consumptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFAEB',
    marginBottom: 12,
  },
  consumptionText: {
    color: '#E0E0E0',
    lineHeight: 22,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 20,
  },
  chartPlaceholderText: {
    color: '#FFFAEB',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFAEB',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(17, 14, 47, 0.8)',
  },
  topicsSection: {
    backgroundColor: '#B4ECFF',
    padding: 20,
  },
  topicsTag: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#110E2F',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  topicsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#110E2F',
    marginBottom: 30,
  },
  topicsGrid: {
    flexDirection: 'column',
  },
  topicCard: {
    backgroundColor: '#FFFAEB',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#110E2F',
    marginBottom: 8,
  },
  topicImage: {
    height: 80,
    width: '100%',
    marginBottom: 12,
  },
  topicBody: {
    color: '#110E2F',
    lineHeight: 20,
    marginBottom: 12,
  },
  topicLink: {
    color: '#110E2F',
    fontWeight: '600',
    marginTop: 8,
  },
});

export default LandingScreen; 