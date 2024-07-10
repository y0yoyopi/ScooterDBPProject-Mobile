import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const { height, width } = Dimensions.get("window");

const TourSpotterScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../app-images/tour-montana-de-7-colores.jpg')} style={tw`flex-1`}>
            <View style={[tw`absolute top-0 left-0 right-0 bottom-0 bg-black opacity-55`]} />
            <SafeAreaView style={tw`flex-1 justify-center items-center`}>
                <View style={tw`flex-1 justify-center items-center`}>
                    <Text style={tw`text-5xl font-bold mb-6 text-center`}>
                        <Text style={tw`text-white`}>Bienvenido a </Text>
                        <Text style={tw`text-blue-500`}>Tour</Text>
                        <Text style={tw`text-purple-500`}>Spotter</Text>
                    </Text>
                    <Text style={tw`text-0 text-white text-base text-center mx-8 mb-5`}>
                    Planifica tus aventuras fácilmente y con seguridad. ¡Empieza tu viaje ahora!
                    </Text>
                </View>
                <View style={tw`mb-18 w-full items-center`}>
                    <TouchableOpacity style={[tw`bg-blue-600 py-2 rounded-lg mb-4`, { width: width * 0.8 }]} onPress={() => navigation.navigate('Register')}>
                        <Text style={tw`text-white text-lg text-center`}>Registrate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[tw`bg-purple-600 py-2 rounded-lg`, { width: width * 0.8 }]} onPress={() => navigation.navigate('Login')}>
                        <Text style={tw`text-white text-lg text-center`}>Inicia Sesión</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default TourSpotterScreen;
