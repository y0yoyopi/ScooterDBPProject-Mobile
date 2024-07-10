import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, ImageBackground } from 'react-native';
import { Magnetometer, Barometer } from 'expo-sensors';
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

const TourSpotterTools = () => {
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [barometerData, setBarometerData] = useState(null);
  const [angle, setAngle] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    Magnetometer.setUpdateInterval(100);
    const magnetometerSubscription = Magnetometer.addListener(data => {
      setMagnetometerData(data);
    });

    Barometer.isAvailableAsync().then(
      (available) => {
        if (available) {
          Barometer.setUpdateInterval(1000);
          const barometerSubscription = Barometer.addListener(data => {
            setBarometerData(data);
          });

          return () => {
            magnetometerSubscription && magnetometerSubscription.remove();
            barometerSubscription && barometerSubscription.remove();
          };
        } else {
          setErrorMsg('El Barómetro no está disponible en el dispositivo');
        }
      },
      (error) => {
        setErrorMsg('Could not check barometer availability: ' + error.message);
      }
    );
  }, []);

  useEffect(() => {
    const { x, y } = magnetometerData;
    let newAngle = Math.atan2(y, x) * (180 / Math.PI) - 83;
    if (newAngle < 0) {
      newAngle += 360;
    }
    setAngle(newAngle);
  }, [magnetometerData]);

  const calculateAltitude = (pressure) => {
    const seaLevelPressure = 1013.25;
    const altitude = 44330 * (1.0 - Math.pow(pressure / seaLevelPressure, 0.1903));
    return altitude.toFixed(2);
  };

  // Calcular la posición de las marcas en coordenadas polares
  const radius = width * 0.30; // Ajustar el radio para que las marcas estén dentro del círculo

  const getMarkStyle = (markAngle) => {
    const angleRad = ((angle - markAngle) * Math.PI) / 180;
    const translateX = radius * Math.sin(angleRad);
    const translateY = -radius * Math.cos(angleRad);
    return {
      transform: [
        { translateX: translateX },
        { translateY: translateY },
      ],
    };
  };

  const northMarkStyle = getMarkStyle(0);
  const eastMarkStyle = getMarkStyle(90);
  const southMarkStyle = getMarkStyle(180);
  const westMarkStyle = getMarkStyle(270);

  return (
    <ImageBackground
      source={require('../app-images/Oasis_Huacachina_Perú_-_camilogaleano(.)com.jpg')}
      style={styles.background}
    >
      <View style={[tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50`]} />
      <View style={styles.container}>
        <View style={tw`absolute top-20 flex-row items-center justify-center`}>
          <Text style={tw`text-3xl font-bold text-blue-500`}>Tour</Text>
          <Text style={tw`text-3xl font-bold text-purple-500`}>Spotter</Text>
          <Text style={tw`text-3xl font-bold text-black`}>Tools</Text>
        </View>
        <Text style={styles.compassText}>Dirección: {angle.toFixed(2)}°</Text>
        <View style={styles.compassContainer}>
          <Animated.View style={[styles.mark, northMarkStyle]}>
            <Text style={styles.northMarkText}>N</Text>
          </Animated.View>
          <Animated.View style={[styles.mark, eastMarkStyle]}>
            <Text style={styles.directionMarkText}>O</Text>
          </Animated.View>
          <Animated.View style={[styles.mark, southMarkStyle]}>
            <Text style={styles.directionMarkText}>S</Text>
          </Animated.View>
          <Animated.View style={[styles.mark, westMarkStyle]}>
            <Text style={styles.directionMarkText}>E</Text>
          </Animated.View>
        </View>
        <View style={styles.altimeterContainer}>
          <Text style={styles.altimeterText}>
            Altitud: {barometerData ? calculateAltitude(barometerData.pressure) : 'N/A'} m
          </Text>
        </View>
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassContainer: {
    width: width * 0.73,
    height: width * 0.73,
    borderWidth: 2,
    borderRadius: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo blanco con opacidad
  },
  compassText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color : 'white'
  },
  mark: {
    position: 'absolute',
    width: 20,
  },
  northMarkText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  directionMarkText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  altimeterContainer: {
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  altimeterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'salmon',
    fontSize: 15,
    position: 'absolute',
    bottom: 30,
  },
});

export default TourSpotterTools;
