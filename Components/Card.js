import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Card(props) {

    const navigation = useNavigation();
    // console.log(props.nutrition[0])

    const image = require('../assets/16.png')
    return (
        <TouchableOpacity onPress={()=>navigation.navigate("Detail",{item:props})}>
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={props.img} style={styles.image} resizeMode='contain' />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{props.name}</Text>
                    {/* <Text>{props.id}</Text> */}
                    <Text style={styles.category}>{props.category}</Text>
                    <View style={styles.ratingContainer}>
                        <Entypo name="star" size={20} color="#FFD700" />
                        <Text style={styles.rating}>{props.rating}</Text>
                        <FontAwesome5 name="heart" size={20} color="black" style={styles.heartIcon} />
                    </View>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
       marginHorizontal:5,
       marginVertical:10,
       flex:1,
    },
    card: {
        width: 170,
        padding: 10,
        height:220,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
        
    },
    image: {
        width: 120,
        height: 140,
        borderRadius: 30,
        alignSelf:'center'
    },
    textContainer: {
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft:5,
        marginTop:-5
 },
    category: {
        fontSize: 12,
        color: 'gray',
        marginLeft:5

    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft:2,

    },
    rating: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    heartIcon: {
        marginLeft: 'auto',
    },
});
