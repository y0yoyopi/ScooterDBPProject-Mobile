import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { XMarkIcon, CameraIcon } from 'react-native-heroicons/outline';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

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
    const [areDetailsExpanded, setAreDetailsExpanded] = useState(false);
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

    const toggleDetails = () => {
        setAreDetailsExpanded(!areDetailsExpanded);
    };

    const handleCameraOpen = () => {
        navigation.navigate('Camera');
    };

    const handleReviewSubmit = () => {
        console.log('Review submitted:', newReview);
        setNewReview('');
    };

    return (
        <ScrollView style={tw`flex-1 bg-transparent`}>
            <SafeAreaView  style={tw`flex-1 bg-transparent`}>
                <View style={tw`absolute top-10 left-5 z-10`}>
                    <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
                        <XMarkIcon color="black" size={30} />
                    </TouchableOpacity>
                </View>
                <Image source={imageMap[tour.imageUrl]} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{tour.title}</Text>
                    <Text style={styles.highlight}>{tour.tourDetails.highlight}</Text>
                    <Text style={styles.price}>S/.{tour.price}</Text>
                </View>
            </SafeAreaView>
            <View style={tw`p-5`}>
                <TouchableOpacity onPress={toggleDescription} style={tw`mb-5 border-b border-gray-300 pb-5`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Descripción</Text>
                    {isDescriptionExpanded && <Text style={tw`text-base text-gray-700`}>{tour.description}</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleItinerary} style={tw`mb-5 border-b border-gray-300 pb-5`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Itinerario</Text>
                    {isItineraryExpanded && <Text style={tw`text-base text-gray-700`}>{tour.itinerary.split('\n').map((item, index) => (
                        <Text key={index} style={item.includes('Día') ? tw`font-bold` : null}>{item}</Text>
                    ))}</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDetails} style={tw`mb-5 border-b border-gray-300 pb-5`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Detalles</Text>
                    {areDetailsExpanded && (
                        <View style={tw`text-base text-gray-700`}>
                            <View style={tw`flex-row items-center mb-2`}>
                                <MaterialCommunityIcons name="map-marker" size={20} color="gray" />
                                <Text style={tw`ml-2`}>{tour.tourCategory.name}</Text>
                            </View>
                            <View style={tw`flex-row items-center mb-2`}>
                                <MaterialCommunityIcons name="account" size={20} color="gray" />
                                <Text style={tw`ml-2`}>{tour.tourDetails.guideLanguage}</Text>
                            </View>
                            <View style={tw`flex-row items-center mb-2`}>
                                <MaterialCommunityIcons name="clock" size={20} color="gray" />
                                <Text style={tw`ml-2`}>{tour.tourDetails.tourDuration}</Text>
                            </View>
                            <Text style={tw`font-bold`}>{tour.tourDetails.frequentQuestion}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleReviews} style={tw`mb-5 pb-5`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Reseñas</Text>
                    {areReviewsExpanded && (
                        <View style={tw`text-base text-gray-700`}>
                            {tour.reviews.length > 0 ? (
                                tour.reviews.map((review, index) => (
                                    <View key={index} style={tw`mb-4`}>
                                        <Text style={tw`mb-2`}>{review.comment}</Text>
                                        <Text style={tw`text-gray-600`}>Rating: {review.rating}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={tw`mb-4 text-gray-600`}>Sé el primero en dejar una reseña</Text>
                            )}
                            <View style={tw`flex-row items-center mb-4`}>
                                <TextInput
                                    style={tw`flex-1 border border-gray-300 rounded p-2 bg-gray-100`}
                                    placeholder="Escribe tu reseña"
                                    value={newReview}
                                    onChangeText={setNewReview}
                                />
                                <TouchableOpacity onPress={handleCameraOpen} style={tw`ml-2`}>
                                    <CameraIcon color="black" size={30} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={handleReviewSubmit} style={tw`bg-purple-600 py-3 rounded-lg`}>
                                <Text style={tw`text-white text-center text-lg`}>Crear Reseña</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    highlight: {
        fontSize: 18,
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8b5cf6',
        alignSelf: 'flex-end',
    },
});

export default TourScreen;
