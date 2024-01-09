
import React ,{useState} from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity ,Dimensions} from 'react-native';
import { handleShareNow } from '../firbaseConfig';
import Footer from './footer';

export const Sharedreams = ({navigation}) => {
  const width=Dimensions.get('window').width;
  let style={}
  if(width < 768)
  {
     style={marginTop: '30%'}
  }
  else
  style={marginTop:10}

    const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const nameUser=localStorage.getItem("name");
  const Pic=localStorage.getItem("profilePic");
  const send = () => {
    if (title.trim().length < 5 || content.trim().length < 250) {
        // Check if title is less than 5 characters or content is less than 50 characters
        alert('Please ensure the title is at least 5 characters and content is at least 250 characters');
      } else if (!title.trim() || !content.trim()) {
        // Check if title or content is empty or contains only whitespace
        alert('Please fill in all fields');
      } else {
        // Proceed with handling share now
        handleShareNow(navigation, title, content, nameUser, Pic);
      }
  };
  return (
    
    <ScrollView contentContainerStyle={styles.container}>
     
      <View style={[styles.form,style]}>
        <Text style={styles.header}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Give Your Dream An Exclusive Title"
          multiline={true}
          numberOfLines={2}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={styles.header}>Content</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={7}
          placeholder="Describe Your Dreamy Experience"
          onChangeText={(text) => setContent(text)}
        />

        <View style={styles.starsAndMoons}></View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.add} onPress={send}>
            <Text style={styles.view}>Share Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer/>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#0d0149',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url('https://www.color-meanings.com/wp-content/uploads/2023/04/abstract-eye-in-purple-clouds-1024x682.jpeg')`
  },
  form: {
    
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  input: {
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 50,
    color: 'white'
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  starsAndMoons: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    opacity: 0.5,
    backgroundColor: 'transparent', // Placeholder for background image
  
    backgroundImage: `url('https://w0.peakpx.com/wallpaper/692/446/HD-wallpaper-clear-night-sky-stars-planets-moon-dark-sky-night.jpg')`,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  add: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'blue',
    borderWidth: 1,
    fontWeight: 'bold',
  },
  view: {
    color: '#efecff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});