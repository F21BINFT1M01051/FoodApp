import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function (props) {
  return (
    <View style={{width:360, marginHorizontal:10,marginVertical:8, backgroundColor:'#181818', borderRadius:20, height:60}}>
        <TextInput placeholder={props.placeholder} style={{marginLeft:26, color:'gray', marginTop:15}} placeholderTextColor={"gray"} onChangeText={props.onChangeText} value={props.value} />
    </View>
  )
}