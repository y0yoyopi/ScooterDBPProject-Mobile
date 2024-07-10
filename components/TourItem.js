import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const imageMap = {
    'cementerio-presbitero.jpg': require('../images/cementerio-presbitero.jpg'),
    'colca-canyon.jpg': require('../images/colca-canyon.jpg'),
    'cuzco-foto1.jpg': require('../images/cuzco-foto1.jpg'),
    'huaraz-aventura.jpg': require('../images/huaraz-aventura.jpg'),
    'lima-center.jpg': require('../images/lima-center.jpg'),
};

const TourItem = ({ tour }) => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Tour', { tour })}>
            <View style={[tw`flex-row bg-white shadow-md rounded-lg mb-4`, { width: width - 20, height: 110 }]}>
                <Image source={imageMap[tour.imageUrl]} style={styles.image} />
                <View style={tw`flex-1 p-2`}>
                    <Text style={[tw` font-bold mb-1`, styles.text]}>{tour.title}</Text>
                    <View style={tw`flex-row items-center`}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color="gray" />
                        <Text style={[tw`text-gray-600 ml-1`, styles.text]}>{tour.tourDetails.tourDuration}</Text>
                    </View>
                    <View style={tw`flex-row items-center mt-1`}>
                        <MaterialCommunityIcons name="earth" size={16} color="gray" />
                        <Text style={[tw`text-gray-600 ml-1`, styles.text]}>{tour.tourDetails.guideLanguage}</Text>
                    </View>
                    <Text style={[tw`text-purple-500 text-lg font-bold mt-1`, styles.price]}>
                        S/.{tour.price}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    text: {
        fontSize: 14,
    },
    price: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default TourItem;
