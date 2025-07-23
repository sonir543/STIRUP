//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from './utils/responsive';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

export const scale = size => width / guidelineBaseWidth * size;
export const verticalScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;


const NewsDetailsScreen = () => {
  const route = useRoute();
  const { item } = route.params || {};

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No news data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: scale(16),
  },
  image: {
    width: '100%',
    height: verticalScale(220),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(18),
    backgroundColor: '#eee',
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  date: {
    fontSize: moderateScale(14),
    color: '#888',
    marginBottom: verticalScale(12),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(16),
    color: '#444',
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(16),
    marginTop: verticalScale(20),
  },
});

export default NewsDetailsScreen;
