import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions, Text, ImageBackground, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { register } from "../Api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get("window");

const Register = () => {
  const [body, setBody] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigation = useNavigation();
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (!validateEmail(body.email) || body.password.length < 8) {
      setError("Ingrese un email o contraseña correctos");
    }
    if (!body.email || !body.firstName || !body.lastName || !body.password) {
      setError('Todos los campos son requeridos');
    }
    return () => { setError(''); };
  }, [body]);

  const handleRegister = async () => {
    if (error) {
      return;
    }
    try {
      await register(body);
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("El email ya ha sido registrado");
      } else {
        setError(error.response ? error.response.data : 'Algo ha ido mal');
      }
    }
  };

  const handleChange = (name, value) => {
    setBody({
      ...body,
      [name]: value
    });
  };

  return (
    <ImageBackground source={require('../app-images/High_resolution_wallpaper_background_ID_77702102758.jpeg')} style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={[tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30`]} />
        <ScrollView contentContainerStyle={tw`flex-1 justify-center`}>
          <View style={tw`absolute top-4 left-5`}>
            <TouchableOpacity onPress={() => navigation.navigate('TourSpotterScreen')}>
              <Icon name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-1 justify-center items-center p-7`}>
            <Text style={tw`text-blue-600 text-4xl font-bold mb-14`}>Registrate</Text>
            <TextInput
              accessibilityLabel="first-name"
              value={body.firstName}
              onChangeText={(value) => handleChange('firstName', value)}
              placeholder="Nombres"
              style={[tw`w-full mb-4 bg-transparent`, { borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }]}
              placeholderTextColor="white"
              underlineColor="transparent"
              theme={{ colors: { text: 'white' } }}
            />
            <TextInput
              accessibilityLabel="last-name"
              value={body.lastName}
              onChangeText={(value) => handleChange('lastName', value)}
              placeholder="Apellidos"
              style={[tw`w-full mb-4 bg-transparent`, { borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }]}
              placeholderTextColor="white"
              underlineColor="transparent"
              theme={{ colors: { text: 'white' } }}
            />
            <TextInput
              accessibilityLabel="email"
              value={body.email}
              onChangeText={(value) => handleChange('email', value)}
              placeholder="Email"
              style={[tw`w-full mb-4 bg-transparent`, { borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }]}
              placeholderTextColor="white"
              underlineColor="transparent"
              theme={{ colors: { text: 'white' } }}
            />
            <TextInput
              accessibilityLabel="password"
              value={body.password}
              onChangeText={(value) => handleChange('password', value)}
              placeholder="Contraseña"
              secureTextEntry
              style={[tw`w-full mb-12 bg-transparent`, { borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }]}
              placeholderTextColor="white"
              underlineColor="transparent"
              theme={{ colors: { text: 'white' } }}
            />
            {error ? <Text style={tw`text-red-500 mb-12`}>{error}</Text> : null}
            <TouchableOpacity style={[tw`bg-blue-600 py-3 rounded-lg w-full mb-5`, { width: width * 0.8 }]} onPress={handleRegister}>
              <Text style={tw`text-white text-center text-lg`}>Crear cuenta</Text>
            </TouchableOpacity>
            <Text style={tw`text-white text-center mt-4`} onPress={() => navigation.navigate('Login')}>
              ¿Ya tienes una cuenta? Ingresa aquí
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;
