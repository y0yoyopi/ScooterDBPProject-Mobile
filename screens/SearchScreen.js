import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`flex-row items-center justify-between p-4`}>
                <TextInput 
                    style={tw`flex-1 bg-gray-200 rounded-full p-4 text-black`} 
                    placeholder='Buscar Tour' 
                    placeholderTextColor="gray"
                />
                <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={tw`ml-2`}>
                    <XMarkIcon color="black" size={30} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
