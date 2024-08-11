import { Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons, FontAwesome, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { auth } from '../Firebase';
import { db } from '../Firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';


export default function Profile(props) {
  const [user, setUser] = useState(null);  // Initialize user to null
  const [imageUri, setImageUri] = useState(null);  // State to store the image URI

  // Function to save image URI to AsyncStorage
  const saveImageUriToStorage = async (email, uri) => {
    try {
      await AsyncStorage.setItem(`profileImage_${email}`, uri);
      console.log("Image URI saved to AsyncStorage");
    } catch (error) {
      console.error("Failed to save image URI to AsyncStorage", error);
    }
  };

  // Function to load image URI from AsyncStorage
  const loadImageUriFromStorage = async (email) => {
    try {
      const uri = await AsyncStorage.getItem(`profileImage_${email}`);
      if (uri) {
        setImageUri(uri);
        console.log("Image URI loaded from AsyncStorage");
      }
    } catch (error) {
      console.error("Failed to load image URI from AsyncStorage", error);
    }
  };

  // Gallery Picker
  const pickFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    console.log("Permissions granted");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    console.log("Image picker result: ", result);

    if (!result.canceled && result.assets.length > 0) {
      const pickedUri = result.assets[0].uri;
      setImageUri(pickedUri);  // Update state with the picked image URI
      console.log("Selected Image URI: ", pickedUri);  // Debugging log

      // Save the picked image URI to AsyncStorage
      const userEmail = auth.currentUser?.email;
      if (userEmail) {
        await saveImageUriToStorage(userEmail, pickedUri);
      }
    } else {
      console.log("Image selection cancelled or no assets found");  // Debugging log
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userEmail = auth.currentUser?.email;  // Safely access email
        if (!userEmail) {
          console.error('User is not authenticated or email is not available');
          return;
        }

        console.log('Fetching profile for:', userEmail);

        // Query to find the document with the given email field
        const q = query(collection(db, 'users'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            setUser(doc.data());
          });

          // Load image URI from AsyncStorage
          await loadImageUriFromStorage(userEmail);
        } else {
          console.log('No such document with email:', userEmail);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  console.log(user);

  //log out
  const handleLogout = async () => {
    try {
        // Clear AsyncStorage
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        // Sign out the user from Firebase
        await signOut(auth);


        console.log('User signed out and local data cleared successfully');

        // Navigate to login or home screen
        props.navigation.navigate('Login'); // Adjust the screen name as needed
    } catch (error) {
        console.error('Error signing out and clearing data:', error);
    }
};

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <View style={{ marginHorizontal: 18, marginVertical: 18, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '100%', height: '80%', backgroundColor: 'black', borderRadius: 10, borderWidth: 1, borderColor: 'green', marginTop: 50 }}>
          <View style={{ alignSelf: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: 'gray', marginTop: -50, justifyContent: 'center', alignItems: 'center' }}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <Text style={{color:'white', fontSize:10}}>Upload Image</Text>
              // <Feather name="camera" size={24} color="green" />
            )}
            <TouchableOpacity onPress={pickFromGallery} style={{ position: 'absolute', bottom: 5, right: 5 }}>
              <Feather name="camera" size={24} color="green" />
            </TouchableOpacity>
          </View>
          {user && (
            <>
              <Text style={{ alignSelf: 'center', color: 'green', marginTop: 10, marginBottom: 30 }}>{user.name}</Text>
              <View style={{ width: '93%', height: "12%", borderRadius: 20, borderWidth: 0.5, borderColor: 'green', flexDirection: 'row', alignSelf: 'center', marginHorizontal: 5, marginTop: 25, alignItems: 'center' }}>
                <MaterialIcons name="email" size={24} color="green" style={{ marginLeft: 10 }} />
                <Text style={{ marginLeft: 8, color: 'green' }}>{user.email}</Text>
              </View>
              <View style={{ width: '93%', height: "12%", borderRadius: 20, borderWidth: 0.5, borderColor: 'green', flexDirection: 'row', alignSelf: 'center', marginHorizontal: 5, marginTop: 25, alignItems: 'center' }}>
                <FontAwesome name="phone" size={24} color="green" style={{ marginLeft: 10 }} />
                <Text style={{ marginLeft: 8, color: 'green' }}>{user.phone}</Text>
              </View>
              <View style={{ width: '93%', height: "12%", borderRadius: 20, borderWidth: 0.5, borderColor: 'green', flexDirection: 'row', alignSelf: 'center', marginHorizontal: 5, marginTop: 25, alignItems: 'center' }}>
                <Ionicons name="location" size={24} color="green" style={{ marginLeft: 10 }} />
                <Text style={{ marginLeft: 8, color: 'green' }}>{user.location}</Text>
              </View>
              <View style={{ width: '93%', height: "12%", borderRadius: 20, borderWidth: 0.5, borderColor: 'green', flexDirection: 'row', alignSelf: 'center', marginHorizontal: 5, marginTop: 25, alignItems: 'center' }}>
                <AntDesign name="logout" size={24} color="green" style={{ marginLeft: 10 }} />
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={{ marginLeft: 8, color: 'green' }}>Logout</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
