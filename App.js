import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Switch,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
import NewsDetailsScreen from './src/NewsDetailScreen';
import NewsFeed from './src/NewsFeed';

// Splash Screen Component
const SplashScreen = () => (
  <View style={splashStyles.container}>
    <Image source={require('./src/assets/images/Splash_1.png')} style={splashStyles.logo} />
  </View>
);

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

const onboardingPages = [
  {
    key: 'page1',
    title: 'Ready to Stir Up?',
    image: require('./src/assets/images/Splash_1.png'),
    subtitle: '',
    description: '',
  },
  {
    key: 'page2',
    title: 'Collect Cubes & Earn Rewards',
    image: require('./src/assets/images/Splash_2.png'), // Replace with actual image for page 2
    subtitle: '',
    description: 'Earn rewards as you drink at your local bar. Spend a minimum of $10.00 to earn a cube. 5 Cubes accumulated earn you a reward.',
  },
  {
    key: 'page3',
    title: 'How It Works',
    image: require('./src/assets/images/Splash_3.png'), // Replace with actual image for page 3
    subtitle: '',
    description: "Don't wait in crowded bars or use your credit cards anymore to make payments. Stir Up let's you pay by phone for your drinks and automatically receive rewards.",
  },
  {
    key: 'page4',
    title: 'Pay With Stir Up.\nIt’s Simple!',
    image: require('./src/assets/images/Splash_4.png'), // Replace with actual image for page 4
    subtitle: '',
    description: 'Your tab is automatically opened at the bar when you walk in. Give the bar tender the “Stir Out” when you’re ready to pay your bill.',
  },
  {
    key: 'page5',
    title: 'Look No Further',
    image: require('./src/assets/images/Splash_5.png'), // Replace with actual image for page 5
    subtitle: '',
    description: 'Looking out for Happy Hour drinks ?\nStir Up keeps you upto date with events at each bar.',
  },
  {
    key: 'page6',
    title: 'Cheers!',
    image: require('./src/assets/images/Splash_6.png'), // Replace with actual image for page 6
    subtitle: '',
    description: "Let's Drink n Sync!",
  },
  // Add more pages as needed
];

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ onDone }) => {
  const [page, setPage] = useState(0);
  const scrollRef = React.useRef();

  const handleMomentumScrollEnd = (event) => {
    const newPage = Math.round(event.nativeEvent.contentOffset.x / width);
    setPage(newPage);
  };

  return (
    <View style={onboardStyles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={{ flex: 1, width }}
      >
        {onboardingPages.map((item, idx) => (
          <View key={item.key} style={{ width, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={onboardStyles.heading}>{item.title}</Text>
            <Image source={item.image} style={onboardStyles.logo} />
            {/* Move dots below image and above description */}
            <View style={onboardStyles.dotsContainer}>
              {onboardingPages.map((_, i) => (
                <View
                  key={i}
                  style={[onboardStyles.dot, i === page ? onboardStyles.activeDot : null]}
                />
              ))}
            </View>
            {item.description ? (
              <Text style={onboardStyles.description}>{item.description}</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
      <View style={onboardStyles.bottomRow}>
        <TouchableOpacity style={onboardStyles.registerButton}>
          <Text style={onboardStyles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <View style={onboardStyles.orContainer}>
          <Image source={require('./src/assets/images/OR.png')} style={{ width: 32, height: 32 }} />
        </View>
        <TouchableOpacity style={onboardStyles.signInButton} onPress={onDone}>
          <Text style={onboardStyles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const onboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    color: '#19b5fe',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    marginTop: 40,
    textAlign: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#19b5fe',
  },
  bottomRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingBottom: 0,
    height: 64,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#19b5fe',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  signInButton: {
    flex: 1,
    backgroundColor: '#19b5fe',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  orContainer: {
    width: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  orText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
});

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show splash for 2 seconds, then onboarding
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowOnboarding(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;
  if (showOnboarding) return <OnboardingScreen onDone={() => setShowOnboarding(false)} />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NewsFeed" component={NewsFeed} screenOptions={{headerShown:false}}/>
        <Stack.Screen name="NewsDetail" component={NewsDetailsScreen}  screenOptions={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
