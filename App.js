import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Welcome } from './components/Welcome.js';
import { Dreams } from './components/Dreams.js';
import { Sharedreams } from './components/Sharedreams.js';
import { Viewdreams } from './components/Viewdreams.js';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      await checkLoginStatus();
      setLoading(false);
      // Assuming you've added a loading state
    })();// Check login status when component mounts
  }, []);
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('name'); // Check for 'name' in AsyncStorage
      if (userToken !== null) {
        setLoggedIn(true);
        console.log(loggedIn);
        console.log(userToken); // Update login state if 'name' exists
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const [showSignOut, setShowSignOut] = React.useState(false);

  const handleProfileTap = () => {
    setShowSignOut(!showSignOut);
  };

  const handleSignOut = (navigation) => {
    // Perform sign-out actions here
    AsyncStorage.clear();
    navigation.navigate('Welcome');
    setShowSignOut(!showSignOut);

  };

 
  return (
    <NavigationContainer>
      {loading ? (<View><Text style={{color: 'black',justifyContent: 'center',alignItems: 'center'}}>Loading...</Text></View>):(
      <Stack.Navigator initialRouteName={loggedIn ? 'Explore' : 'Welcome'}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            
          },
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="Dreamscape"
          component={Dreams}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerRight}
                onPress={handleProfileTap}
              >
                <Image
                  style={styles.profilePic}
                  source={{ uri: localStorage.getItem('profilePic') }}
                />
                {showSignOut && (
                  <TouchableOpacity
                    onPress={() => handleSignOut(navigation)}
                    style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                  >
                    <AntDesign name="logout" size={24} color="white" />
                    <Text style={{ color: 'white', padding: 2, marginTop: 2 }}>Sign Out</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Share Yours"
          component={Sharedreams}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            
            headerTitle: () => (
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => navigation.navigate('Explore')}
              >
                <AntDesign name="bulb1" size={28} color="white" />
              </TouchableOpacity>
            ),headerLeft:()=>(
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{color:'white',padding:5,margin:6,fontSize:20,fontWeight:'bold'}}>Share Yours</Text>
           </View> ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerRight}
                onPress={handleProfileTap}
              >
                <Image
                  style={styles.profilePic}
                  source={{ uri: localStorage.getItem('profilePic') }}
                />
                {showSignOut && (
                  <TouchableOpacity
                    onPress={() => handleSignOut(navigation)}
                    style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                  >
                    <AntDesign name="logout" size={24} color="white" />
                    <Text style={{ color: 'white', padding: 2, marginTop: 2 }}>Sign Out</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Explore"
          component={Viewdreams}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => navigation.navigate('Share Yours')}
              >
                <AntDesign name="pluscircleo" size={28} color="white" />
              </TouchableOpacity>
            ),
            headerLeft:()=>(
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{color:'white',padding:5,margin:6,fontSize:20,fontWeight:'bold'}}>Explore</Text>
           </View> ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerRight}
                onPress={handleProfileTap}
              >
                <Image
                  style={styles.profilePic}
                  source={{ uri: localStorage.getItem('profilePic') }}
                />
                {showSignOut && (
                  <TouchableOpacity
                    onPress={() => handleSignOut(navigation)}
                    style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                  >
                    <AntDesign name="logout" size={24} color="white" />
                    <Text style={{ color: 'white', padding: 2, marginTop: 2 }}>Sign Out</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>)}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginRight: 8,
  },
});
