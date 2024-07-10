import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Avatar, Button, Divider } from 'react-native-paper';
import { getProfile, logout } from "../Api";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get("window");

const Profile = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const navigation = useNavigation();
  const [info, setInfo] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const responseInfo = await getProfile();
        setInfo(responseInfo);
      } catch (error) {
        throw error;
      }
    }

    fetchInfo();
  }, [isUpdate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      throw error;
    }
  };

  return (
    <ImageBackground
      source={require('../app-images/5a1dbb4418d0f96913e9f70793ecf8c9.jpg')}
      style={tw`flex-1`}
      imageStyle={{ resizeMode: 'cover', position: 'absolute' }}
    >
      <SafeAreaView style={tw`flex-1`}>
        <View style={[tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30`]} />
        <View style={tw`flex-1 justify-center items-center p-5`}>
          <Avatar.Image size={100} source={{ uri: 'https://via.placeholder.com/100' }} style={tw`mb-5`} />
          <Text style={tw`text-white text-2xl font-bold mb-2`}>{info.firstName + " " + info.lastName}</Text>
          <Text style={tw`text-white text-lg mb-5`}>{info.email}</Text>
          <Divider style={tw`w-full mb-5`} />
          <TouchableOpacity style={[tw`bg-purple-600 py-3 rounded-lg w-full mb-5`, { width: width * 0.8 }]} onPress={handleLogout}>
            <Text style={tw`text-white text-center text-lg`}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;
