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
        
            <View style={{flex:1}}>
                
                
            
                <MapView style={StyleSheet.absoluteFill
                
                }></MapView>

<TouchableOpacity style = {styles.a} onPress={() => navigation.navigate('Booking')}>
                    <XMarkIcon color="black" />
                </TouchableOpacity>
            </View>
        
    )
}

const styles = StyleSheet.create({
    a:{
        marginTop:35,
        marginLeft: 5
    }
})
export default SearchScreen;