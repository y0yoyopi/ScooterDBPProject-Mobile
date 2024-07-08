import {View, Text, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline'
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const SearchScreen = () => {
    const navigation = useNavigation(); 

    return (
        <SafeAreaView>
            <View>
                <TextInput placeholder='Search Tour'/>
                <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
                    <XMarkIcon color="black"/>
                </TouchableOpacity>
                    
            </View>

        </SafeAreaView>
        
    )
}


export default SearchScreen;
