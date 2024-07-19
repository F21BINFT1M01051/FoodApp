import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Buttons(props) {
    return (
        <TouchableOpacity onPress={props.press}>
            <View style={{ width: 290, backgroundColor: '#181818', borderRadius: 20, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color:'lightgray', fontSize:16}} >{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}