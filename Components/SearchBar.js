import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image ,ScrollView} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SearchBar({ data, input, setInput }, props) {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (input === "") {
            return (
              <View>
                {/* <Text>{item.name}</Text> */}
              </View>
            );
          } else if (item.name.toLowerCase().includes(input.toLowerCase())) {

            return (
                <TouchableOpacity onPress={() => navigation.navigate("Detail", { item })}>
                  <View style={styles.container}>
                    <View style={styles.card}>
                      <Image source={item.img} style={styles.image} resizeMode='contain' />
                      <View style={styles.textContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.category}>{item.category}</Text>
                        <View style={styles.ratingContainer}>
                          <Entypo name="star" size={20} color="#FFD700" />
                          <Text style={styles.rating}>{item.rating}</Text>
                          <FontAwesome5 name="heart" size={20} color="black" style={styles.heartIcon} />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
            );
          } else {
            return console.log("No Item Found");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 10,
    flex: 1,
  },
  card: {
    width: 170,
    padding: 10,
    height: 220,
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
    alignSelf: 'center'
  },
  textContainer: {
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: -5
  },
  category: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5

  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 2,

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
