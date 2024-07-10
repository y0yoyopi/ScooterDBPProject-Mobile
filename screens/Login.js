import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions, Text, ImageBackground, TouchableOpacity, StyleSheet,  TextInput} from "react-native";
import { login } from "../Api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get("window");

const Login = ({ handleAuthenticate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('El email y la contraseña son requeridos');
      return;
    }
    try {
      const token = await login(email, password);
      handleAuthenticate(token);
      navigation.navigate("BottomTabs");
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 403) {
        setError("El email o la contraseña son incorrectos");
      } else {
        setError("Un error inesperado ha ocurrido");
      }
    }
  };

  return (
    <ImageBackground source={require('../app-images/48916107251_67776601f6_k.jpeg')} style={tw`flex-1`} imageStyle={{ resizeMode: 'cover', position: 'absolute', right: -100 }}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={[tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30`]} />
        <ScrollView contentContainerStyle={tw`flex-1 justify-center`}>
          <View style={tw`absolute top-4 left-5`}>
            <TouchableOpacity onPress={() => navigation.navigate('TourSpotterScreen')}>
              <Icon name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-1 justify-center items-center p-7`}>
            <Text style={tw`text-purple-600 text-4xl font-bold mb-30`}>Inicia Sesión</Text>
            <TextInput
              accessibilityLabel="email"
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={[tw`w-full mb-4 bg-transparent`, styles.input]}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
            <TextInput
              accessibilityLabel="password"
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              secureTextEntry
              style={[tw`w-full mb-12 bg-transparent`, styles.input]}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
            {error ? <Text style={tw`text-red-500 mb-12`}>{error}</Text> : null}
            <TouchableOpacity style={[tw`bg-purple-600 py-3 rounded-lg w-full mb-9`, { width: width * 0.8 }]} onPress={handleLogin}>
              <Text style={tw`text-white text-center text-lg`}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <Text style={tw`text-white text-center mt-4`} onPress={() => navigation.navigate("Register")}>
              ¿No tienes una cuenta? Regístrate aquí
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    padding: 10,
    fontSize: 16,
  }
});

export default Login;
