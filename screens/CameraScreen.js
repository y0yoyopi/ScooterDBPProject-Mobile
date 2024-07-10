import {View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHelpersContext, useNavigation, useRoute  } from '@react-navigation/native';
import { XMarkIcon, CameraIcon  } from 'react-native-heroicons/outline'
import { useEffect, useState, useRef } from "react";
import { Camera, CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { CameraType } from 'expo-camera/build/Camera.types';

const {width, height} = Dimensions.get('window');

export default function CameraScreen() {
    const navigation = useNavigation(); 
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === null) {
        return <View><Text>Requesting camera permission...</Text></View>;
    }
    if (hasCameraPermission === false) {
        return <Text>No hay acceso a cámara</Text>;
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setImage(photo.uri);
            await MediaLibrary.saveToLibraryAsync(photo.uri);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera} 
                ref={cameraRef}
            >
                <View style={styles.buttonContainer}>
    
                     <TouchableOpacity
                 style={styles.button}
                    onPress={takePicture}
                 />
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 30, // Ajusta este valor según sea necesario
      width: '100%',
      alignItems: 'center',
    },
    button: {
      width: 55,
      height: 55,
      borderRadius: 35,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagePreview: {
      width: width,
      height: height / 2,
    },
  });