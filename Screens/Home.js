import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Card from '../Components/Card';
import { list } from '../Constants';
import { All, Pizza, Burger, Fries, Ice_Cream, Sandwich } from '../ProductsData';
import SearchBar from '../Components/SearchBar';
import { auth } from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [input, setInput] = useState('');
    const [profileImageUri, setProfileImageUri] = useState(null);

    useEffect(() => {
        const loadProfileImage = async () => {
            try {
                const userEmail = auth.currentUser?.email;
                if (userEmail) {
                    const uri = await AsyncStorage.getItem(`profileImage_${userEmail}`);
                    setProfileImageUri(uri);
                }
            } catch (error) {
                console.error('Error loading profile image:', error);
            }
        };

        loadProfileImage();
    }, []);

    const loadProducts = (category) => {
        switch (category) {
            case 'All':
                setProducts(All);
                break;
            case 'Burger':
                setProducts(Burger);
                break;
            case 'Pizza':
                setProducts(Pizza);
                break;
            case 'Fries':
                setProducts(Fries);
                break;
            case 'Sandwich':
                setProducts(Sandwich);
                break;
            default:
                setProducts(All);
                break;
        }
    };

    useEffect(() => {
        loadProducts(selectedCategory);
    }, [selectedCategory]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 18, flex: 1 }}>
                <View style={styles.first}>
                    <View>
                        <Text style={styles.text1}>Foodies</Text>
                        <Text style={styles.text2}>Order Your Favorite Food</Text>
                    </View>
                    <View style={styles.picView}>
                        {profileImageUri ? (
                            <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
                        ) : (
                            <Ionicons name="person-circle-outline" size={70} color="gray" />
                        )}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 10 }}>
                    <View style={styles.search}>
                        <Ionicons name="search" size={24} color="gray" />
                        <TextInput style={{ flex: 1, color: 'gray', marginLeft: 10 }} placeholder='Search' value={input} onChangeText={(t) => setInput(t)} />
                    </View>
                    <TouchableOpacity>
                        <View style={styles.list}>
                            <FontAwesome5 name="list-ul" size={20} color="green" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => setSelectedCategory(item.category)}>
                                <View style={[styles.categoryItem, { backgroundColor: selectedCategory === item.category ? 'green' : 'white' }]} key={index}>
                                    <Text style={{ color: selectedCategory === item.category ? 'white' : 'black' }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <SearchBar data={filteredProducts} input={input} setInput={setInput} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <Card
                                img={item.img}
                                name={item.name}
                                category={item.category}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                nutrition={item.nutrition}
                                id={item.id}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContent}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    first: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    text1: {
        color: 'green',
        fontSize: 60,
        fontFamily: 'IslandMoments-Regular',
    },
    text2: {
        color: 'lightgray',
        marginTop: -20,
    },
    picView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    search: {
        width: 50,
        flex: 1,
        height: 50,
        borderRadius: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    list: {
        width: 45,
        height: 45,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 8,
        marginBottom: 3,
    },
    categoryItem: {
        height: 40,
        width: 80,
        paddingHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
    },
    flatListContent: {
    },
});
