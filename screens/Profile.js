import {SafeAreaView,View,Text,Button,StyleSheet} from "react-native";
  
  import { getProfile } from "../Api";
  import { logout } from "../Api";
  import { useEffect, useMemo, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { Avatar, IconButton, Divider } from 'react-native-paper';
  
  const Profile = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const navigation = useNavigation();
    const [info, setInfo] = useState({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',

      //trips: '',
      //avgRating: 0.0
    })
  
    /*useEffect(() => {
      async function fetchInfo() {
        try {
          const responseInfo = await getProfile();
          setInfo(responseInfo);
        } catch (error) { throw error }
      }
  
      fetchInfo();
    }, [isUpdate])*/
  
    useEffect(() => {
      const fetchInfo = async() => {
        try {
          const responseInfo = await getProfile();
          setInfo(responseInfo);
        } catch (error) { throw error }
      }
  
      fetchInfo();
    }, [isUpdate])
  
    const handleLogout = async () => {
      try {
        await logout();
        navigation.navigate('Login');
      } catch (error) {
        throw error;
      }
    }
  
    return (
      <SafeAreaView>
        <View>
          {/*<Avatar.Image size={100} source={profileImage} style={styles.avatar} />*/}
          <Text>{info.firstName + " " + info.lastName}</Text>
          {/* <Text>Email: {info.email}</Text> */}
          {/* <Text>Phone Number: {info.phoneNumber}</Text> */}
          <View>
          <Button title="Cerrar sesión" onPress={handleLogout}></Button>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  export default Profile;
  