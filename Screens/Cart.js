import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'; // Import FlatList for rendering lists
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { Entypo, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { addToCart, removeFromCart, emptyCart } from '../Components/redux/action';


export default function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);

  const decrement = (item) => {
    if (item && item.id) {
      dispatch(removeFromCart(item));
    } else {
      console.error("Item or item.id is undefined");
    }
  };

  const emptyYourCart = () =>{
    dispatch(emptyCart())
  }
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseInt(item.price) * parseInt(item.quantity)), 0);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>

      <View style={{ marginHorizontal: 18, marginVertical: 18, flex: 1 }}>
        <Text style={{ alignSelf: 'center', fontSize: 28, fontWeight: "700", marginTop: 10, color: 'green' }}>Your Cart</Text>
        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "500", marginTop: 5, color: 'lightgray' }}>Your Selected Items:</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{
              marginVertical: 15, flexDirection: 'row', width: '100%', height: 70, borderRadius: 50, backgroundColor: 'white', shadowColor: 'gray',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              elevation: 10,
            }}>
              <Text style={{ fontSize: 16, marginTop: 20, marginHorizontal: 10, marginLeft: 15 }}>{parseInt(item.quantity)}x</Text>

              <Image source={item.img} style={{ width: 60, height: 60, borderRadius: 5, marginTop: 5 }} />

              <Text style={{ marginTop: 22, marginHorizontal: 10, flex: 1 }}>{item.name}</Text>
              <Text style={{ marginTop: 22, marginHorizontal: 20 }}>{parseInt(item.price) * parseInt(item.quantity)} $</Text>
              <TouchableOpacity onPress={() => decrement(item)}>
                <AntDesign name="minuscircle" size={28} color="green" style={{ marginRight: 14, marginTop: 20 }} />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={{ width: "100%", height: 50, borderRadius: 20, backgroundColor: '#FFA500', alignSelf: 'center', marginVertical: 6, }}>
          <Text style={{ color: 'brown', fontSize: 16, alignSelf: 'center', marginTop: 11, fontWeight: 'bold' }}>Your Total Bill is : {getTotalPrice()} $</Text>

        </View>

        <View style={{ width: "100%", height: 50, borderRadius: 20, backgroundColor: 'green', alignItems: 'center', marginTop: 6, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={emptyYourCart}>

            <Entypo name="circle-with-cross" size={36} color="white" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("order")}>

            <FontAwesome name="phone-square" size={34} color="white" style={{ marginLeft: 5 }} />
          </TouchableOpacity>

          <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center', marginLeft: 50, flex: 1 }}>Order Now</Text>
        </View>
      </View>
    </SafeAreaView>

  );
}
