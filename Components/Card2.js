import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Card_2(props) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Detail", { item: props })}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={props.img} style={styles.image} resizeMode='contain' />
                    <View style={styles.textContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.name}>{props.name}</Text>
                            <Text style={{ marginTop: 20 }}>{props.price}</Text>
                        </View>
                        <Text style={styles.category}>{props.category}</Text>
                        <View style={styles.ratingContainer}>
                            <Entypo name="star" size={17} color="#FFD700" />
                            <Text style={styles.rating}>{props.rating}</Text>
                            <FontAwesome5 name="heart" size={18} color="black" style={styles.heartIcon} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 10,
        flex: 1,
        marginBottom:10
    },
    card: {
        width: "100%",
        padding: 10,
        height: 120,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
        flexDirection: "row"


    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 30,
        alignSelf: 'center'
    },
    textContainer: {
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
        marginTop: 20,
        flex: 1
    },
    category: {
        fontSize: 12,
        color: 'gray',
        marginLeft: 5

    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 2,

    },
    rating: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 'bold',
        // flex:1
    },
    heartIcon: {
        marginLeft: 160,
        // marginRight:-6
    },
});
