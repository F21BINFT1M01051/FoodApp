import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../Components/Card';
import { All_2 } from '../All';
import Card_2 from '../Components/Card2';
import SearchBar from '../Components/SearchBar';

export default function Search() {
  const [input, setInput] = useState('');

  const filteration = All_2.filter(product =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );


  return (
    <View style={{ backgroundColor: 'white' , marginBottom:20}}>
      <View style={{ marginHorizontal: 16, marginVertical: 16,}}>
        <Text style={{ fontSize: 22, alignSelf: 'center', marginVertical: 10, fontWeight: '700', color: 'green' }}>Search Your Favorite Food:</Text>
        <View style={styles.search}>
          <Ionicons name="search" size={24} color="gray" style={{ marginLeft: 5 }} />
          <TextInput style={{ marginLeft: 5 }} placeholder='Search' value={input} onChangeText={(t) => setInput(t)} />
        </View>
        <SearchBar data={filteration} input={input} setInput={setInput} />

        <View style={{marginBottom:80 }}>
        <FlatList
          data={All_2}
          renderItem={({ item }) => (
            <Card_2
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
          // numColumns={2}
          showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.flatListContent}
        />
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  search: {
    width: '100%',
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
    marginVertical: 10
  },
})