

import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, TouchableOpacity, StyleSheet,Image,Dimensions} from 'react-native';
import { signInWithGoogle } from "../firbaseConfig";
import Footer from './footer';

const go=require('../assets/google.png')
export const Welcome = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let style={};
 
  const windowDimensions = Dimensions.get('window');
    if(windowDimensions.width < 768)
    {
      
      style={marginTop:'35%'}
      }else
      style={marginTop:'4%'}
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn(); // Trigger the fade-in animation on component mount
  }, []);
  const handleSignInWithGoogle = () => {
    signInWithGoogle(navigation);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.emo,style]}>🌒</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.textM}>{`Dream\nWell`}</Text>
      </Animated.View>
      <Text style={styles.textS}>Dreamscape</Text>
      <View style={styles.buttgrp}>
        
      <TouchableOpacity style={styles.login} onPress={handleSignInWithGoogle}>
        <Text style={styles.signup}>Sign Up With Google</Text>
          <Image source={go} style={styles.img}/>
        </TouchableOpacity>
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  img:{
    marginLeft: 6,
    borderRadius: 25,
    height:22,
    width:22
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0d0149',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url('https://www.color-meanings.com/wp-content/uploads/2023/04/purple-dreamworld-in-crystal-ball.jpeg')`
  },
  emo: {
    
    color: '#9f8bff',
    fontSize: 65,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textS: {
    marginTop: 4,
    fontSize: 25,
    color: '#efecff',
    fontFamily: 'Roca One',
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  textM: {
    transform: [{ skewX: '-5deg' }],
    marginTop: 5,
    color: '#9f8bff',
    fontSize: 74,
    fontWeight: 'bold',
    fontFamily: 'Roca One',
    textAlign: 'center',
    letterSpacing: 2,
  },
  buttgrp: {
    marginTop: 11,
    flexDirection: 'row',
  },
  login: {
    flexDirection: 'row',
    letterSpacing:2,
    borderRadius: 8,
    padding: 6,
    margin: 5,
    backgroundColor: '#343cff',
    borderWidth: 1,
   
    fontWeight: 'bold',
  },
  signup: {
    
    letterSpacing:2,
    color: '#efecff',
    
    fontWeight: 'bold',
  },
});