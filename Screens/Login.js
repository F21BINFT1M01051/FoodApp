import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInputField from '../Components/TextInputField'
import Password from '../Components/Password'
import Buttons from '../Components/Buttons'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Login(props) {

    // Firebse Login Code
    const auth = getAuth();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    // AsyncStorage Code
const _storeUserCredentials = async()=>{
    try{
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        console.log("user credentials stored")
    }
    catch(e){
        console.log(e)
    }

}


const _getUserCredentials = async()=>{
    try{
        let email = await AsyncStorage.getItem('email');
        let password = await AsyncStorage.getItem('password');
        console.log("credentials fetched")
        return{email, password}
    }
    catch(e){
        console.log(e);
        return{email:'',password:''}
    }
}

useEffect(()=>{
    const fetchCredentials = async()=>{
        const credentials = await _getUserCredentials();
        if(credentials.email && credentials.password){
            setEmail(credentials.email)
            setPassword(credentials.password)
        }
        console.log(email,password)
    }
    fetchCredentials();


},[])

//Firebase Login setup
    const SignIn = () => {
        if (password && email) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    _storeUserCredentials();
                    props.navigation.navigate("BottomNavigation")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Invalid Credentials")
                });

        }
        else{
            alert('Wrong Information')
        }

    }



    return (
        <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>

            <View style={{ marginHorizontal: 18, marginVertical: 18, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginTop: 50 }}>
                    <Text style={{ color: "#B8B8B8", fontSize: 30, fontWeight: "400" }}>Welcome Back!</Text>
                    <Text style={{ color: 'gray', fontSize: 16, marginTop: 5 }}>Please Login To Your Account</Text>
                </View>
                <View style={{ marginTop: 110 }}>
                    <TextInputField placeholder={'Email / Phone'} onchangeText = {(t)=> setEmail(t)} value={email} />
                    <Password placeholder={'Password'} onchangeText={(t)=>setPassword(t)} value={password} />
                </View>
                <View style={{ marginTop: 120 }}>
                    <Buttons title={'LOGIN'} press={SignIn} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <TouchableOpacity>
                        <Image source={require("../assets/icons8-google-48.png")} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'lightgray', marginLeft: 12, marginTop: 5 }}>Login With Google</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 65 }}>
                    <Text style={{ color: 'gray' }}>Don't have an account</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
                        <Text style={{ color: 'green' }}>  Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}