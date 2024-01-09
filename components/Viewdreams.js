import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Footer from './footer';
import { Dimensions } from 'react-native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { fetchData } from '../firbaseConfig';

export const Viewdreams = () => {
  let style={};
  let fbasis={};
  const windowDimensions = Dimensions.get('window');
    if(windowDimensions.width < 768)
    {
      if(windowDimensions.height>914)
      {
      style={height:'776px'}
      }
      else if(windowDimensions.height<750)
      {
        style={height:'580px'}
      }
      else{
        style={height:'670px'}
      }
      fbasis={flexBasis: '90%',}
    }
    else 
    {
      style={height:'420px'}
      fbasis={flexBasis: '45%',}
    }
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [dreams, setDreams] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);
  const [userDreams, setUserDreams] = useState([]);
  const [showUsersOverlay, setShowUsersOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    
    fetchDataFromFirebase();
  }, []);
  const fetchDataFromFirebase = async () => {
    try {
      const data = await fetchData();
      setDreams(data);

      const usersSet = new Set();
      const uniqueUsersData = data.reduce((acc, curr) => {
        if (!usersSet.has(curr.profilePic)) {
          usersSet.add(curr.profilePic);
          acc.push({ name: curr.name, profilePic: curr.profilePic });
        }
        return acc;
      }, []);

      setUniqueUsers(uniqueUsersData);

      // Initially, display all dreams
      setUserDreams(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderUserDreams = () => {
    return (
      <View style={styles.dreamsContainer}>
        {userDreams.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.productCard,fbasis]} onPress={() => openDreamOverlay(item)}>
            <View style={styles.productInfo}>
              <View style={styles.userInfo}>
                <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
                <Text style={styles.userN}>{item.name}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text
                style={styles.cardContent}
              >{item.content.length > 100 ? `${item.content.slice(0, 90)}...` : item.content}</Text>
              <Text
                style={{ textAlign: 'right', color: 'white', marginTop: 20, marginBottom: 10 }}
              >
                {item.timestamp.substring(0, item.timestamp.indexOf("GMT"))}
              </Text>
              <TouchableOpacity style={{ marginTop: 5 }} onPress={() => openDreamOverlay(item)}>
                <Text style={styles.readMore}>Read More</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const openDreamOverlay = (item) => {
    setSelectedDream(item);
    setOverlayVisible(true);
  };

  const closeDreamOverlay = () => {
    setSelectedDream(null);
    setOverlayVisible(false);
  };

  const toggleUsersOverlay = () => {
    setShowUsersOverlay(!showUsersOverlay);
  };

  const renderUsersOverlay = () => {
    if (!showUsersOverlay) return null;
  
    return (
      <Modal visible={showUsersOverlay} transparent={true} animationType="slide">
        <View style={styles.usersOverlay}>
          {/* Close button for the users overlay */}
         
          
          {/* Users list */}
          <ScrollView style={styles.usersList}>
            {uniqueUsers.map((user, index) => (
              <TouchableOpacity key={index} onPress={() => showUserDreams(user)}>
                <View style={styles.userCard}>
                  <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
                  <Text style={styles.userN}>{user.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={{alignItems:'center',marginTop:10}} onPress={toggleUsersOverlay}>
            <Text style={{color: 'white',fontSize: '20'}}>Close</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  

  const showUserDreams = (selectedUser) => {
    const userFilteredDreams = dreams.filter((dream) => dream.profilePic === selectedUser.profilePic);
    setUserDreams(userFilteredDreams);
    toggleUsersOverlay();
  };

  const renderDreamOverlay = () => {
    if (!selectedDream) return null;
    return (
      <Modal visible={overlayVisible} transparent={true} animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeDreamOverlay}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <ScrollView style={styles.overlayText}>
              <Text style={styles.overlayTitle}>{selectedDream.title}</Text>
              <Text style={styles.overlayContentText}>{selectedDream.content}</Text>
              <Text style={{textAlign:'right',marginRight:15,marginTop:6,marginBottom:6}}>{selectedDream.name}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  const toggleUsersVisibility = () => {
    setShowUsersOverlay(!showUsersOverlay);
  };

  return (
    
    <View style={styles.container}  >
      <TouchableOpacity style={styles.toggleButton} onPress={toggleUsersVisibility}>
        <AntDesign name="user" color="white" size={24} />
      </TouchableOpacity>

      <ScrollView style={[styles.content,style]}>
        <View style={styles.innerContent}>
        <Text style={styles.columnTitle}>Dreams</Text>
        {userDreams.length > 0 ? renderUserDreams() : null}
        </View>
      </ScrollView>
      {renderDreamOverlay()}
      {renderUsersOverlay()}
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  dreamsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',// Allow cards to wrap to next row
    justifyContent: 'space-evenly', // Distribute cards evenly
    marginBottom: 10,
  },
container: {
    flex: 1,
   
    flexDirection: 'row',
    backgroundColor: '#fff',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('https://img.freepik.com/free-photo/dreamy-night-sky-illustration-design_826849-608.jpg')`,
  },
  toggleButton: {
    position: 'fixed',
    left: 20,
    top: '300px',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'purple',
    borderRadius: 8,
    zIndex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 100,
    marginLeft: '15%' ,
    // Adjust based on your footer's height
  },
  innerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dreamsColumn: {
    
    height: 800,
    marginLeft:'20%',
    padding: 20,
    color: 'white',
    flex: 1,
    
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Roca One',
  },
  usersOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start', // Align the overlay to the left side
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20, // Adjust left padding for better alignment
    paddingBottom: 20, // Ad
    
  },
  usersList: {
    marginTop: 20,
    padding: 10,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('https://img.freepik.com/free-photo/dreamy-night-sky-illustration-design_826849-608.jpg')`,
    borderRadius: 10,
    maxHeight: '80%',
  },
  
  userN:{
    color: 'white',
    fontSize: 14
  },
  usersColumn: {
    maxWidth:'80%',
    padding:20,
    
    color: 'white',
  },

  columnTitleU: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roca One',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center'
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Roca One',
    textAlign: 'center'
  },
  userCard: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'center',
    padding:5,
    borderRadius:14,
    backgroundColor: 'black',
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: '#f0f0f0',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('https://img.freepik.com/free-photo/dreamy-night-sky-illustration-design_826849-608.jpg')`,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
    
    borderWidth: 3,
    borderColor: 'white',
    margin:5
  },
  userInfo:{
    flexDirection: 'row',
    
    
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  readMore: {
    marginTop: 5,
    letterSpacing:2,
    fontSize:14,
    padding: 4,
    borderRadius: 2,
    borderColor: 'white',
    borderWidth: 2,
    textAlign: 'center',
    backgroundColor: 'purple',
    color: 'white',
  },
  cardTitle: {
    marginTop:10,

    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 10,
    color:'white',
    fontFamily: 'helvetica',
  },
  cardContent: {
    fontFamily: `'Great Vibes', cursive`,
    fontSize: 16,
    color:'azure',
    letterSpacing: 1
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/27f0db43-7864-4334-9bda-ab3c6b3dd17c/deu0i2j-fb4593e0-5a6b-42be-8745-af4702791b5e.jpg/v1/fill/w_1280,h_871,q_75,strp/dream_world_by_kh1marts_deu0i2j-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODcxIiwicGF0aCI6IlwvZlwvMjdmMGRiNDMtNzg2NC00MzM0LTliZGEtYWIzYzZiM2RkMTdjXC9kZXUwaTJqLWZiNDU5M2UwLTVhNmItNDJiZS04NzQ1LWFmNDcwMjc5MWI1ZS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.OeydiACAjvJkuENyg32C4APj3WWMqWtriSL7MbH3NKk')`,
  },
  overlayContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  overlayText: {
    marginTop: 10,
  },
  overlayTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'helvetica',
    letterSpacing: 1,


  },
  overlayContentText: {
    fontSize: 16,
    fontFamily: `'Great Vibes', cursive`,
    letterSpacing:1
  },
});

export default Viewdreams;
