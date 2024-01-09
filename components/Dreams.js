import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Footer from './footer';
const path = 'https://witchyspiritualstuff.com/wp-content/uploads/2022/10/purple-aura-made-by-artifical-intelligence-1024x1024.jpg';

export function Dreams({ navigation }) {
  return (
    <ImageBackground source={{ uri: path }} style={styles.background}>
      <View style={styles.overlay}>
        <View>
          <Text style={styles.textM}>DIVE INTO THE WORLD OF</Text>
          <Text style={styles.textM}>DREAMS</Text>
          <Text style={{ fontSize: 70, textAlign: 'center' }}>🌃</Text>
        </View>
        <View style={styles.buttongrp}>
          <TouchableOpacity style={styles.add} onPress={() => { navigation.navigate("Share Yours") }}>
            <Text style={styles.view}>Share Yours</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.add} onPress={() => { navigation.navigate("Explore")}}>
            <Text style={styles.view}>View Dreams</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)', // Adjust the opacity (0.5 is 50% black)
    justifyContent: 'center',
  },
  buttongrp: {
    marginTop: 11,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textM: {
    marginTop: 5,
    color: '#9f8bff',
    fontSize: 45,
    fontWeight: 'bold',
    fontFamily: 'Roca One',
    textAlign: 'center',
    letterSpacing: 2,
  },
  add: {
    letterSpacing: 2,
    borderRadius: 8,
    padding: 6,
    margin: 5,
    backgroundColor: '#343cff',
    borderWidth: 1,
    fontWeight: 'bold',
  },
  view: {
    letterSpacing: 2,
    color: '#efecff',
    fontWeight: 'bold',
  },
});

export default Dreams;
