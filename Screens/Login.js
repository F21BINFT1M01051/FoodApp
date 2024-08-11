import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../Components/TextInputField';
import Password from '../Components/Password';
import Buttons from '../Components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../Firebase'; // Import auth from the configured Firebase file
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Store user credentials in AsyncStorage
  const _storeUserCredentials = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      console.log('User credentials stored');
    } catch (e) {
      console.error('Error storing credentials:', e);
    }
  };

  // Get user credentials from AsyncStorage
  const _getUserCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      console.log('Credentials fetched');
      return { email, password };
    } catch (e) {
      console.error('Error fetching credentials:', e);
      return { email: '', password: '' };
    }
  };

  useEffect(() => {
    const fetchCredentials = async () => {
      const credentials = await _getUserCredentials();
      if (credentials.email && credentials.password) {
        setEmail(credentials.email);
        setPassword(credentials.password);
      }
      console.log('Fetched credentials:', credentials.email, credentials.password);
    };
    fetchCredentials();
  }, []);

  // Sign in user with Firebase
  const SignIn = () => {
    if (password && email) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          _storeUserCredentials();
          props.navigation.navigate('BottomNavigation'); // Navigate to your main screen
        })
        .catch((error) => {
          console.error('Sign in error:', error);
          alert('Invalid Credentials');
        });
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
      <View style={{ marginHorizontal: 18, marginVertical: 18, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ marginTop: 50 }}>
          <Text style={{ color: '#B8B8B8', fontSize: 30, fontWeight: '400' }}>Welcome Back!</Text>
          <Text style={{ color: 'gray', fontSize: 16, marginTop: 5 }}>Please Login To Your Account</Text>
        </View>
        <View style={{ marginTop: 110 }}>
          <TextInputField placeholder={'Email / Phone'} onChangeText={(t) => setEmail(t)} value={email} />
          <Password placeholder={'Password'} onChangeText={(t) => setPassword(t)} value={password} />
        </View>
        <View style={{ marginTop: 120 }}>
          <Buttons title={'LOGIN'} press={SignIn} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 25 }}>
          <TouchableOpacity>
            <Image source={require('../assets/icons8-google-48.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <Text style={{ color: 'lightgray', marginLeft: 12, marginTop: 5 }}>Login With Google</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 65 }}>
          <Text style={{ color: 'gray' }}>Don't have an account</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={{ color: 'green' }}>  Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
