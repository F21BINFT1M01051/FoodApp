import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';



const Splash = (props) => {


    return (
        <SafeAreaView style={{backgroundColor:'black'}}>
            <StatusBar />
            <View style={styles.container}>
                <View>
                    <Text style={{ color: 'green', fontSize: 70, fontFamily: 'IslandMoments-Regular',marginTop:10 }}>Foodies</Text>
                </View>
                <View style={{
                    width: 250,
                    height: 250,
                    // backgroundColor: 'white',
                    borderRadius: 125,
                    // alignSelf: 'center',
                    marginTop: 120

                }}>
                    <Image source={require('../assets/splash.png')} style={{width:260,height:250}} />
                   

                </View>
                <View>
                    <Text style={{ fontSize: 25, color: 'green', marginTop: 60, alignSelf: 'center' }}>Enjoy Your Food</Text>
                    <Text style={{ fontSize: 15, color: 'gray', marginTop: 10, alignSelf: 'center' }}>Order Your Favorite Food With No Delivery Charges </Text>
                </View>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
                    <View style={{width:320,height:50,borderRadius:20,backgroundColor:'green',alignSelf:'center',marginVertical:90}}>
                        <Text style={{color:'lightgray',fontSize:18,alignSelf:'center',marginTop:13,}}>Get Started</Text>

                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>


    )
}

export default Splash;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        // flex:1,
        alignItems:'center',
    }

})