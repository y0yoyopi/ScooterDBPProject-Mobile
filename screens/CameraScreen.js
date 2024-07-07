import {View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHelpersContext, useNavigation, useRoute  } from '@react-navigation/native';
import { XMarkIcon, CameraIcon  } from 'react-native-heroicons/outline'
import { useEffect, useState } from "react";

const {width, height} = Dimensions.get('window');

const CameraScreen = () => {
    const navigation = useNavigation(); 
    return(
        <Text>
            something
        </Text>
    )
}
export default CameraScreen;