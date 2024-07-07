import React from 'react'
import { View, Text, Image, StyleSheet, Touchable, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const imageMap = {
    'cementerio-presbitero.jpg': require('../images/cementerio-presbitero.jpg'),
    'colca-canyon.jpg': require('../images/colca-canyon.jpg'),
    'cuzco-foto1.jpg': require('../images/cuzco-foto1.jpg'),
    'huaraz-aventura.jpg': require('../images/huaraz-aventura.jpg'),
    'lima-center.jpg': require('../images/lima-center.jpg'),
  };

const TourItem = ({ tour }) => {
    const navigation = useNavigation();
    

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Tour', {tour})}>
    <View>
      <Image source={imageMap[tour.imageUrl]} style={styles.image}/>
      <Text>{tour.title}</Text>
      <Text>{tour.description}</Text>
      <Text>Price: ${tour.price}</Text>
    </View>
    </TouchableWithoutFeedback>
  );

  
};

const styles = StyleSheet.create({
    image: {
        width: 100, 
        height: 200, 
        resizeMode: 'cover', 
      }
});
export default TourItem;