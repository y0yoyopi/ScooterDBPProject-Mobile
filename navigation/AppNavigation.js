import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import BottomTabs from '../screens/BottomTabs';
import Profile from '../screens/Profile';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const [token, setAuth] = useState('');
  const handleAuthenticate = (t) => {
    setAuth(t);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Login" options={{ headerShown: false }} >
          {props => <Login {...props} handleAuthenticate={handleAuthenticate} />}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
        <Stack.Screen name="BottomTabs" options={{ headerShown: false }} component={BottomTabs}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default AppNavigation;