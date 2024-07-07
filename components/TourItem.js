import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
//<Image source={{ uri: tour.imageUrl }} />

const TourItem = ({ tour }) => {
  return (
    <View>
      
      <Text style={styles.title}>{tour.title}</Text>
      <Text>{tour.description}</Text>
      <Text>Price: ${tour.price}</Text>
    </View>
  );
};

export default TourItem;