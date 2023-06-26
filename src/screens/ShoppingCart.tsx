import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
import CartListItem from "../components/CartListItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCreateOrderMutation } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";

const ShoppingCartTotals = () => {
  const freeDeliveryThreshold = useSelector(
    (state: RootState) => state.cart.freeDeliveryMinimum
  );
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const total = useSelector((state: RootState) => state.cart.total);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text>Subtotal</Text>
        <Text style={{ fontSize: 16, color: "#a0a0a0" }}>
          {subtotal.toFixed(2)} USD
        </Text>
      </View>

      <View style={styles.row}>
        <Text>Delivery</Text>
        <Text style={{ fontSize: 16, color: "#a0a0a0" }}>
          {subtotal >= freeDeliveryThreshold ? 0.0 : deliveryFee.toFixed(2)} USD
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total.toFixed(2)} USD</Text>
      </View>
    </View>
  );
};

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
  const total = useSelector((state: RootState) => state.cart.total);

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      costumer: {
        name: "John Doe",
        address: "123 Main St",
        email: "jonhdoe@gmail.com",
      },
    });
    console.log("Order created");

    if ("data" in result && result.data?.status === "OK") {
      Alert.alert(
        "Your order has been submitted",
        `the order reference: ${result.data?.data.ref}`
      );
      dispatch(cartSlice.actions.clearCart());
    }
  };  

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ShoppingCartTotals}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          margin: 20,
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={onCreateOrder}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Checkout
          {isLoading && <ActivityIndicator />}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "#e0e0e0",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
