import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const ShareDreamsHeader = ({ navigation }) => {
  return (
    <View style={{
      backgroundColor: 'purple',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10, // Ensure header stays on top
      paddingHorizontal: 15,
      paddingVertical: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
        Share Yours
      </Text>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate('Explore')}
      >
        <AntDesign name="pluscircleo" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 20, alignItems: 'center' }}
        // Update params for sign-out
      >
        <Image
          style={{ width: 45, height: 45, borderRadius: 20, marginRight: 8 }}
          source={{ uri: localStorage.getItem('profilePic') }}
        />
        {('showSignOut') && (
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <AntDesign name="logout" size={24} color="white" />
            <Text style={{ color: 'white', padding: 2, marginTop: 2 }}>Sign Out</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

