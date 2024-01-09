import React from
 
'react';
import { View, Text, StyleSheet,TouchableOpacity ,Linking} from 'react-native';
const handlePress = async (url) => {
    try {
      if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url);
      } else {
        console.warn('Cannot open URL:', url);
        // Handle the error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };
const Footer = () => {
  return (
    <View
 
style={styles.footer}>

      
<Text
 
style={styles.text}>Made By <TouchableOpacity onPress={() => handlePress('https://portfolio-ver-2.netlify.app/')}><Text style={{color:'purple',backgroundColor:'white',padding:1}}>Kshitiz</Text></TouchableOpacity><Text style={{fontSize:23}}>💤😴</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop:10,
    backgroundColor: 'purple',
    padding: 10,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Verdana',
    letterSpacing: 1,
    fontWeight:'600',
    fontSize: 18
  },
});

export default Footer;