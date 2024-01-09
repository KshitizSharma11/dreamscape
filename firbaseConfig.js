
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, push,get, orderByChild } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyB3hATuvWOgVZWsNeUB1OKZDOLmlxIbJ1k",
  authDomain: "dreamscape-dcd51.firebaseapp.com",
  databaseURL: "https://dreamscape-dcd51-default-rtdb.firebaseio.com",
  projectId: "dreamscape-dcd51",
  storageBucket: "dreamscape-dcd51.appspot.com",
  messagingSenderId: "554742590273",
  appId: "1:554742590273:web:6f0162ef1a6404db8f4fc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export  const signInWithGoogle = async (navigation) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const name = result.user.displayName;
    const email = result.user.email;
    const profilePic = result.user.photoURL;
    navigation.navigate("Dreamscape");

    // Store user data in AsyncStorage
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('profilePic', profilePic);
  } catch (error) {
    console.log(error);
  }
    
};
export const handleShareNow = (navigation,title,content,nameUser,Pic) => {
  // Create a new dream object
  const dreamData = {
    title: title,
    content: content,
    timestamp: new Date().toString() ,
    name: nameUser,
    profilePic: Pic
    
  };

  // Get a reference to the database
  const dreamsRef = ref(database, 'dreams');

  // Push new dream data to the database
  push(dreamsRef, dreamData)
    .then(() => {
      // Data successfully added to the database
      console.log('Dream shared successfully:', dreamData);
      navigation.navigate("Explore");
      // You can add further actions or reset the state here
    })
    .catch((error) => {
      // Error handling if data couldn't be added
      console.error('Error sharing dream:', error);
    });
};


export const fetchData = async () => {
  const dreamsRef = ref(database, 'dreams'); // Reference to 'dreams' node in your database

  try {
    const snapshot = await get(dreamsRef); // Fetch data snapshot from 'dreams' node
    const dreams = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        // Retrieve data for each dream and push it to the dreams array
        const dreamData = childSnapshot.val();
        dreams.push(dreamData);
      });
    }
    return dreams; // Return the array of dreams fetched from Firebase
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Throw error for handling in the component
  }
};
