import {View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHelpersContext, useNavigation, useRoute  } from '@react-navigation/native';
import { XMarkIcon, CameraIcon  } from 'react-native-heroicons/outline'
import { useEffect, useState } from "react";

const {width, height} = Dimensions.get('window');


const imageMap = {
    'cementerio-presbitero.jpg': require('../images/cementerio-presbitero.jpg'),
    'colca-canyon.jpg': require('../images/colca-canyon.jpg'),
    'cuzco-foto1.jpg': require('../images/cuzco-foto1.jpg'),
    'huaraz-aventura.jpg': require('../images/huaraz-aventura.jpg'),
    'lima-center.jpg': require('../images/lima-center.jpg'),
  };

const TourScreen = () => {
    const navigation = useNavigation(); 
    const route = useRoute();
    const { tour } = route.params;


    const [isItineraryExpanded, setIsItineraryExpanded] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [areReviewsExpanded, setAreReviewsExpanded] = useState(false);
    const [newReview, setNewReview] = useState('');

    const toggleItinerary = () => {
        setIsItineraryExpanded(!isItineraryExpanded);
    };

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const toggleReviews = () => {
        setAreReviewsExpanded(!areReviewsExpanded);
      };

      const handleCameraOpen = () => {
        navigation.navigate('Camera');
      };

    return(
        <ScrollView>
        <View>
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <XMarkIcon color="black"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
            <View>
            <Image source={imageMap[tour.imageUrl]} style={styles.image} />
            <Text>{tour.title}</Text>

            <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.itineraryTitle}>Description</Text>
            {isDescriptionExpanded && <Text style={styles.itineraryText}>{tour.description}</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleItinerary}>
            <Text style={styles.itineraryTitle}>Itinerary</Text>
            {isItineraryExpanded && <Text style={styles.itineraryText}>{tour.itinerary}</Text>}
            </TouchableOpacity> 


            <TouchableOpacity onPress={toggleReviews}>
            <Text style={styles.sectionTitle}>Reviews</Text>
          </TouchableOpacity>
          {areReviewsExpanded && (
            <View>
              {tour.reviews.length > 0 ? (
                tour.reviews.map((review, index) => (
                  <View key={index} >
                    <Text >{review.comment}</Text>
                    <Text>Rating: {review.rating}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noReviewsText}>Be the first to leave a review</Text>
              )}

              <View style={styles.reviewInputContainer}>
                <TextInput
                  style={styles.reviewInput}
                  placeholder="Write your review"
                  value={newReview}
                  onChangeText={setNewReview}
                />
                <TouchableOpacity onPress={handleCameraOpen}>
                  <CameraIcon color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: width, 
        height: 300, 
        resizeMode: 'cover', 
      }
});
export default TourScreen;