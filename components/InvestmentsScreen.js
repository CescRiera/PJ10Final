import React, { useRef, useEffect } from 'react';
import { 
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
import InvestmentTrendsChart from './charts/InvestmentTrendsChart';

// Investment model class
class Investment {
  constructor(
    title,
    description,
    image,
    category,
    location,
    status,
    partner,
    partnerLogo,
    amount
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.category = category;
    this.location = location;
    this.status = status;
    this.partner = partner;
    this.partnerLogo = partnerLogo;
    this.amount = amount;
  }
}

const InvestmentsScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const staggeredAnim1 = useRef(new Animated.Value(0)).current;
  const staggeredAnim2 = useRef(new Animated.Value(0)).current;
  const fadeUpAnim = useRef(new Animated.Value(0)).current;

  const africanInvestments = [
    new Investment(
      "Iniciativa de Purificació d'Aigua a Kenya",
      "Plantes de tractament d'aigua a gran escala que proporcionen aigua potable a 5 milions de residents en zones rurals mitjançant sistemes de purificació amb energia solar.",
      require('../assets/kenyawater.jpg'),
      "Infraestructura d'Aigua",
      "Nairobi, Kenya",
      "En progress",
      undefined,
      undefined,
      120000000
    ),
    new Investment(
      "Projecte de Reg Intel·ligent a Nigèria",
      "Sistemes de reg impulsats per IA que cobreixen 50.000 hectàrees de terreny agrícola, augmentant la producció de cultius en un 40% mentre es redueix el consum d'aigua.",
      require('../assets/nigeriawater.jpg'),
      "Tecnologia Agrícola",
      "Kano, Nigèria",
      "Completat",
      undefined,
      undefined,
      75000000
    ),
    new Investment(
      "Programa de Recollida d'Aigua de Pluja a Rwanda",
      "Iniciativa nacional per instal·lar 100.000 sistemes intel·ligents de recollida d'aigua de pluja en comunitats urbanes i rurals.",
      require('../assets/rwandawater.jpg'),
      "Sostenibilitat",
      "Kigali, Rwanda",
      "En expansió",
      undefined,
      undefined,
      45000000
    )
  ];
  
  const globalInvestments = [
    new Investment(
      "Fons d'Infraestructura d'Aigua Xina-Àfrica",
      "Inversió de 2.400 milions de dòlars en sistemes de gestió d'aigua transfronterers a 12 nacions africanes. També un nou sistema de regadiu.",
      require('../assets/chinawater.jpg'),
      "Desenvolupament Internacional",
      "Pan-Africà",
      "Actiu",
      "Banc de Desenvolupament de la Xina",
      require('../assets/chinabank.jpg'),
      2400000000
    ),
    new Investment(
      "Iniciativa de Seguretat de l'Aigua de la UE",
      "Programa de 850 milions d'euros de la Unió Europea per a solucions sostenibles d'aigua als països de la regió del Sahel.",
      require('../assets/europewater.jpg'),
      "Resiliència Climàtica",
      "Regió del Sahel",
      "Fase de planificació",
      "Unió Europea",
      require('../assets/eu.png'),
      850000000
    ),
    new Investment(
      "Programa Urbà d'Aigua de l'USAID",
      "Implementació de tecnologies intel·ligents de xarxa d'aigua en 8 grans ciutats africanes per reduir les pèrdues de distribució.",
      require('../assets/usawater.jpg'),
      "Desenvolupament Urbà",
      "Múltiples Ciutats",
      "Implementació",
      "Agència dels Estats Units per al Desenvolupament Internacional",
      require('../assets/usaid.png'),
      325000000
    )
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ca-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  const formatInvestmentTitle = (title) => {
    return title.length > 40 ? title.substring(0, 40) + '...' : title;
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();

    Animated.stagger(100, [
      Animated.timing(staggeredAnim1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(staggeredAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();

    Animated.timing(fadeUpAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  const renderInvestmentCard = (investment, index, animValue) => {
    const animDelay = index * 100;
    
    return (
      <Animated.View 
        key={index}
        style={[
          styles.investmentCard,
          { 
            opacity: animValue, 
            transform: [{ 
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }]
          }
        ]}
      >
        <View style={styles.cardImageContainer}>
          <Image 
            source={investment.image} 
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{investment.category}</Text>
          </View>
        </View>
        
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{formatInvestmentTitle(investment.title)}</Text>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {investment.description}
          </Text>
          
          <View style={styles.cardFooter}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{investment.location}</Text>
            </View>
            
            {investment.status && (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{investment.status}</Text>
              </View>
            )}
            
            {investment.amount && (
              <View style={styles.amountContainer}>
                <Text style={styles.amountIcon}>💰</Text>
                <Text style={styles.amountText}>{formatCurrency(investment.amount)}</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="dark" />
      

      
      {/* Intro Section */}
      <Animated.View style={[styles.introSection, { opacity: fadeAnim }]}>
        <View style={styles.introBox}>
          <Text style={styles.pageTitle}>Transformant Àfrica a través d'Inversions Estratègiques</Text>
          <Text style={styles.pageDescription}>
            L'economia africana està experimentant una transformació notable, impulsada per iniciatives locals innovadores 
            i aliances estratègiques globals. Descobreix els projectes d'inversió dinàmics que estan donant forma al futur del continent.
          </Text>
        </View>
      </Animated.View>
      
      {/* African Initiatives Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Iniciatives Africanes</Text>
        <View style={styles.cardContainer}>
          {africanInvestments.map((item, index) => 
            renderInvestmentCard(item, index, staggeredAnim1)
          )}
        </View>
      </View>
      
      {/* Investment Trends Chart Section */}
      <View style={styles.chartSectionContainer}>
        <Text style={styles.sectionHeader}>Tendències d'Inversió per Sector</Text>
        <View style={styles.chartContainer}>
          <InvestmentTrendsChart />
        </View>
      </View>
      
      {/* Global Investments Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Inversions Globals</Text>
        <View style={styles.cardContainer}>
          {globalInvestments.map((item, index) => 
            renderInvestmentCard(item, index, staggeredAnim2)
          )}
        </View>
      </View>
      
      {/* Analysis Section */}
      <Animated.View style={[styles.analysisSection, { opacity: fadeUpAnim }]}>
        <Text style={styles.analysisTitle}>Anàlisi de Tendències d'Inversió</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#E59B50' }]}>48.000 M€+</Text>
            <Text style={styles.statLabel}>Inversions Totals</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#73CCD4' }]}>1,2K+</Text>
            <Text style={styles.statLabel}>Projectes Actius</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#110E2F' }]}>54%</Text>
            <Text style={styles.statLabel}>Taxa de Creixement</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#E59B50' }]}>38</Text>
            <Text style={styles.statLabel}>Països</Text>
          </View>
        </View>
      </Animated.View>
      
      {/* Footer would go here */}
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAEB',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#FFFAEB',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    padding: 8,
    paddingLeft: 0,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E59B50',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#110E2F',
    marginLeft: 16,
  },
  introSection: {
    paddingVertical: 20,
  },

  pageTitle: {
    fontSize: Math.min(24, width * 0.06),
    fontWeight: 'bold',
    color: '#110E2F',
    marginBottom: 16,
    textAlign: 'center',
  },
  pageDescription: {
    fontSize: Math.min(16, width * 0.04),
    paddingHorizontal: 20,
    lineHeight: 24,
    color: 'rgba(17, 14, 47, 0.9)',
    textAlign: 'justify',
  },
  investmentSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#110E2F',
    marginBottom: 16,
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: '#E59B50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  viewAllText: {
    color: '#E59B50',
    fontWeight: '500',
  },
  cardsContainer: {
    // Cards are rendered as a column in React Native
  },
  investmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
  },
  cardImageContainer: {
    height: 180,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFAEB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#110E2F',
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#110E2F',
    lineHeight: 24,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardDescription: {
    color: 'rgba(17, 14, 47, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 14,
  },
  locationText: {
    fontSize: 14,
    color: 'rgba(17, 14, 47, 0.8)',
  },
  statusBadge: {
    backgroundColor: 'rgba(115, 204, 212, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#110E2F',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountIcon: {
    marginRight: 4,
    fontSize: 14,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#110E2F',
  },
  analysisSection: {
    backgroundColor: 'rgba(17, 14, 47, 0.05)',
    padding: 24,
    marginTop: 0,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#110E2F',
    marginBottom: 16,
  },
  chartSectionContainer: {
    marginBottom: 30,
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(17, 14, 47, 0.8)',
  },
});

export default InvestmentsScreen; 