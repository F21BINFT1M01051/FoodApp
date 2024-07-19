import { View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Feather from '@expo/vector-icons/Feather';


export default function Password(props) {

    const [isVisible, setIsvisible] = useState(false);

    const togglePasswordVisibility = ()=>{
        setIsvisible(!isVisible)
    }

    return (
        <View style={{ width: 360, marginHorizontal: 10, marginVertical: 8, backgroundColor: '#181818', borderRadius: 20, height: 60 , flexDirection:'row', alignItems:'center'}}>
            <TextInput placeholder={props.placeholder} style={{ marginLeft: 26, color: 'gray' , flex:1}} placeholderTextColor={"gray"} secureTextEntry={!isVisible} onChangeText={props.onchangeText} value={props.value} />
            <TouchableOpacity onPress={togglePasswordVisibility} >
                <Feather name={isVisible ? 'eye':'eye-off'} size={20} color={'gray'} style={{marginRight:20}} />
            </TouchableOpacity>
        </View>
    )
}