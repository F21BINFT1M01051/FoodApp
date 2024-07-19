import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInputField from '../Components/TextInputField'
import Password from '../Components/Password'
import Buttons from '../Components/Buttons'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../Firebase";


export default function SignUp(props) {
    const auth = getAuth();
    const db = getFirestore(db);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');


    const SignUp =async () => {
        const docRef = await addDoc(collection(db, 'users'), {
            name,
            email,
            phone,
        });
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                alert("created")
                props.navigation.navigate("Login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }




    return (
        <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>

            <View style={{ marginHorizontal: 18, marginVertical: 18, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginTop: 50 }}>
                    <Text style={{ color: "#B8B8B8", fontSize: 26, fontWeight: "400" }}>Create a new Account</Text>
                    <Text style={{ color: 'gray', fontSize: 16, marginTop: 7, marginLeft: 8 }}>Please fill up the form to Sign Up</Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <TextInputField placeholder={'Name'} onchangeText={(t)=>setName(t)} value={name} />
                    <TextInputField placeholder={'Email'} onchangeText={(t)=>setEmail(t)} value={email} />
                    <TextInputField placeholder={'Phone Number'} onchangeText={(t)=>setPhone(t)} value={phone}  />
                    <Password placeholder={'Password'} onchangeText={(t)=>setPassword(t)} value={password} />
                </View>
                <View style={{ marginTop: 90 }}>
                    <Buttons title={'SignUp'} press={SignUp} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity>
                        <Image source={require("../assets/icons8-google-48.png")} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'lightgray', marginLeft: 12, marginTop: 5 }}>SignUp With Google</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <Text style={{ color: 'gray' }}>Already have an account</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                        <Text style={{ color: 'green' }}>  Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}