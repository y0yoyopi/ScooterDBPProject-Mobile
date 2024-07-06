import { View, StyleSheet, SafeAreaView, Button, Image } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { login } from "../Api";


const Login = ({ handleAuthenticate }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
  
    const navigation = useNavigation();
  
    const handleLogin = async () => {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
      const token = await login(email, password);
        handleAuthenticate(token);
        navigation.navigate("BottomTabs");
      try {
        const token = await login(email, password);
        handleAuthenticate(token);
        navigation.navigate("BottomTabs");
      } catch (error) {
        setError("Email or password is incorrect");
      }
    }


return (
  <SafeAreaView>
    <View>
      <Image/>
      <Text>Login in TourSpotter</Text>
      <TextInput accessibilityLabel="email"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      >
      </TextInput>
      <TextInput accessibilityLabel="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      >
      </TextInput>
      {error ? <Text>{error}</Text> : null}
      <View>
      <Button title="Log In" onPress={handleLogin}></Button>
      </View>
      {/* Reemplazo el button 4 cambiar estylo 
      <Button mode="outlined" title="Don't have an account? Register" style={styles.registerText} onPress={() => navigation.navigate("Register")}></Button> */}
      <Text onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
    </View>

  </SafeAreaView>
);
    
}

export default Login;