import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, emptyCart } from '../Components/redux/action';

const Detail = ({ navigation, route }) => {
  const { item } = route.params; // Access the item from route.params
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  // console.log(item);

  // console.log(cartItems);
  

  const increment = () => {
    if (item && item.id) {
      dispatch(addToCart(item));
    } else {
      console.error("Item or item.id is undefined");
    }
  };

  const decrement = () => {
    if (item && item.id) {
      dispatch(removeFromCart(item));
    } else {
      console.error("Item or item.id is undefined");
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Image source={item.img} style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 20 }} resizeMode='contain' />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: 18, marginLeft: 5 }}>{`${item.name} / ${item.category}`}</Text>
          <Text style={{ marginRight: 10, fontSize: 18, color: 'green', fontWeight: '500', fontStyle: 'italic' }}>{item.price}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5 }}>
          <Entypo name="star" size={20} color="#FFD700" />
          <Text style={{ marginLeft: 5, fontSize: 14, flex: 1 }}>{`${item.rating} (8)`}</Text>
          <Text>Free Delivery</Text>
          <MaterialIcons name="delivery-dining" size={24} color="green" style={{ marginLeft: 5, marginRight: 5 }} />
        </View>
        <View style={{ marginTop: 15, marginLeft: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'gray' }}>Description</Text>
          <Text style={{ fontSize: 15, color: 'gray', marginTop: 8 }}>{item.description}</Text>
        </View>
        <View style={{ marginTop: 15, marginLeft: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'gray' }}>Nutritions</Text>
          <Text style={{ marginTop: 5, marginLeft: 10, color: 'orange' }}>{`Calories: ${item.nutrition[0]?.Calories ?? 'N/A'}`}</Text>
          <Text style={{ marginTop: 5, marginLeft: 10, color: 'green' }}>{`Fat: ${item.nutrition[1]?.Fat ?? 'N/A'}`}</Text>
          <Text style={{ marginTop: 5, marginLeft: 10, color: 'brown' }}>{`Carbohydrates: ${item.nutrition[3]?.Carbohydrates ?? 'N/A'}`}</Text>
          <Text style={{ marginTop: 5, marginLeft: 10, color: 'brown' }}>{`Protein: ${item.nutrition[6]?.Protein ?? 'N/A'}`}</Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={increment}>
              <AntDesign name="pluscircle" size={38} color="green" />
            </TouchableOpacity>
            <Text style={{marginLeft:10,marginTop:5, fontSize:16,fontWeight:"bold"}}>{quantity}</Text>
            <TouchableOpacity onPress={decrement}>
              <AntDesign name="minuscircle" size={38} color="green" style={{ marginLeft: 14 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={{ width: 170, height: 50, borderRadius: 20, backgroundColor: 'green', alignSelf: 'center', marginTop: 6, marginLeft: 60 }}>
              <Text style={{ color: 'lightgray', fontSize: 18, alignSelf: 'center', marginTop: 11 }}>Add to Cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({});
