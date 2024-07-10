import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const centerMapOnUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        showsUserLocation={true}
        followsUserLocation={true}
        region={{
          latitude: location ? location.coords.latitude : 37.78825,
          longitude: location ? location.coords.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <TouchableOpacity style={styles.a} onPress={() => navigation.navigate('Booking')}>
        <XMarkIcon color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.centerButton} onPress={centerMapOnUserLocation}>
        {/* Empty TouchableOpacity for circular button without text */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  a: {
    marginTop: 35,
    marginLeft: 5,
  },
  centerButton: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
