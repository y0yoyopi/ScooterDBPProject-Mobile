import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DeviceMotion, Barometer } from 'expo-sensors';

const { width, height } = Dimensions.get('window');

const TourSpotterTools = () => {
  const [deviceMotionData, setDeviceMotionData] = useState({ rotation: { alpha: 0, beta: 0, gamma: 0 } });
  const [barometerData, setBarometerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    DeviceMotion.setUpdateInterval(100);
    const deviceMotionSubscription = DeviceMotion.addListener(data => {
      setDeviceMotionData(data);
    });

    Barometer.isAvailableAsync().then(
      (available) => {
        if (available) {
          Barometer.setUpdateInterval(1000);
          const barometerSubscription = Barometer.addListener(data => {
            setBarometerData(data);
          });

          return () => {
            deviceMotionSubscription && deviceMotionSubscription.remove();
            barometerSubscription && barometerSubscription.remove();
          };
        } else {
          setError('Barometer is not available on this device.');
        }
      },
      (error) => {
        setError('Could not check barometer availability: ' + error.message);
      }
    );
  }, []);

  const getDirection = () => {
    let { alpha } = deviceMotionData.rotation;
    let angle = alpha * (180 / Math.PI);
    if (angle < 0) {
      angle += 360;
    }
    return angle.toFixed(2);
  };

  const calculateAltitude = (pressure) => {
    const seaLevelPressure = 1013.25; // hPa
    const altitude = 44330 * (1.0 - Math.pow(pressure / seaLevelPressure, 0.1903));
    return altitude.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.compassContainer}>
        <Text style={styles.compassText}>Direction: {getDirection()}°</Text>
      </View>
      <View style={styles.altimeterContainer}>
        <Text style={styles.altimeterText}>
          Altitude: {barometerData ? calculateAltitude(barometerData.pressure) : 'N/A'} m
        </Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    position: 'absolute',
    bottom: 20,
  },
});

export default TourSpotterTools;
