import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListTours from '../components/ListTours';
import tw from 'twrnc';

const categories = ['Aventura', 'Cultural', 'Naturaleza', 'Urbano', 'Misterio y Terror'];

const Booking = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
  
    return (
        <ImageBackground source={require('../app-images/394937632_824233713040166_6969483681223020049_n.jpg')} style={tw`flex-1`}>
            <View style={tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30`} />
            <SafeAreaView style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-center p-4 m-15`}>
                    <Text style={tw`text-5xl font-bold text-blue-500`}>Tour</Text>
                    <Text style={tw`text-5xl font-bold text-purple-500`}>Spotter</Text>
                </View>
                <View style={tw`flex-row items-center justify-between p-4`}>
                 <TouchableOpacity
                        style={tw`flex-1 flex-row items-center bg-transparent border border-gray-200 rounded-full px-4 py-2`}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <MaterialCommunityIcons name="magnify" size={24} color="white" />
                        <Text style={tw`text-lg text-white ml-2`}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`ml-4 bg-transparent border border-gray-200 p-2 rounded-full`}
                        onPress={() => navigation.navigate('Map')}
                    >
                        <MaterialCommunityIcons name="compass" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={tw`text-xl font-bold p-4 text-white`}>Categorías</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {categories.map(category => (
                        <View key={category} style={tw`mb-4 pl-2.5`}>
                            <Text style={tw`text-lg font-bold mb-2 text-white`}>{category}</Text>
                            <ListTours category={category} />
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Booking;
