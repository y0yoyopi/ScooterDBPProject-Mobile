import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Button, Text, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { register } from "../Api";

const { height } = Dimensions.get("window");


import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Register = () => {

  const [body, setBody] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    /*phone: ''*/
  })

  const navigation = useNavigation();

  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (!validateEmail(body.email) || body.password.length < 8) {
      setError("Enter a valid email and password")
    }
    if (!body.email || !body.firstName || !body.lastName || !body.password /*|| !body.phone*/) {
      setError('All fields are required')
    }
    return () => { setError('') }
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
            setError("Email already registered");
          } else {
            setError(error.response ? error.response.data : 'Something went wrong');
          }
    }
  }

  const handleChange = (name, value) => {
    setBody({
      ...body,
      [name]: value
    })
  };


  return (
    <SafeAreaView>
    <ScrollView>
      <View>
      <Image/>
        <Text>Register</Text>
        <TextInput accessibilityLabel="first-name"
          value={body.firstName}
          onChangeText={(value) => { handleChange('firstName', value) }}
          placeholder="First Name" 
        ></TextInput>

        <TextInput accessibilityLabel="last-name"
          value={body.lastName}
          onChangeText={(value) => { handleChange('lastName', value)  }}
          placeholder="Last Name"
        ></TextInput>

        <TextInput accessibilityLabel="email"
          value={body.email}
          onChangeText={(value) => { handleChange('email', value) }}
          placeholder="Email"
        ></TextInput>

        <TextInput accessibilityLabel="password"
          value={body.password}
          onChangeText={(value) => { handleChange('password', value) }}
          placeholder="Password"
        ></TextInput>
        {/*
        <TextInput accessibilityLabel="phone"
          value={body.phone}
          onChangeText={(value) => { handleChange('phone', value) }}
          placeholder="Phone"
        ></TextInput>*/}
        {error ? <Text >{error}</Text> : null}
        <View >
        <Button title="Register" onPress={handleRegister}></Button>
        </View>
        {/*ya te la sabes 
        <Button title="GoToLogIn" onPress={() => navigation.navigate('Login')}>Login</Button>*/}
        <Text onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};



export default Register;
