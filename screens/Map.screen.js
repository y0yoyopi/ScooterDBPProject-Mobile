import {View, Text, Dimensions, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline'
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps'

const {width, height} = Dimensions.get('window');

const SearchScreen = () => {
    const navigation = useNavigation(); 

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <XMarkIcon color="black"/>
                </TouchableOpacity>
                <MapView style={StyleSheet.absoluteFill}></MapView>
                    
            </View>

        </SafeAreaView>
        
    )
}
export default SearchScreen;