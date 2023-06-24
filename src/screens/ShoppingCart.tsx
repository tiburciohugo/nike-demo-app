import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CartListItem from "../components/CartListItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCreateOrderMutation } from "../store/apiSlice";

const ShoppingCartTotals = () => {
  const freeDeliveryThreshold = useSelector(
    (state: RootState) => state.cart.freeDeliveryMinimum
  );
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
  const subtotal = useSelector((state: RootState) =>
    state.cart.subtotal.toFixed(2)
  );
  const total =
    Number(subtotal) >= freeDeliveryThreshold
      ? subtotal
      : subtotal + deliveryFee;

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text>Subtotal</Text>
        <Text style={{ fontSize: 16, color: "#a0a0a0" }}>{subtotal} USD</Text>
      </View>

      <View style={styles.row}>
        <Text>Delivery</Text>
        <Text style={{ fontSize: 16, color: "#a0a0a0" }}>
          {Number(subtotal) >= freeDeliveryThreshold ? 0.0 : deliveryFee} USD
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} USD</Text>
      </View>
    </View>
  );
};

export default function ShoppingCart() {
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
  const freeDeliveryThreshold = useSelector(
    (state: RootState) => state.cart.freeDeliveryMinimum
  );
  let finalDeliveryFee = subtotal >= freeDeliveryThreshold ? 0 : deliveryFee;
  let finalTotal = subtotal + finalDeliveryFee;

  const onCreateOrder = () => {
    createOrder({
      items: cartItems,
      subtotal,
      deliveryFee: finalDeliveryFee,
      total: finalTotal,
      costumer: {
        name: "John Doe",
        address: "123 Main St",
        email: "jonhdoe@gmail.com",
      },
    });
    console.log("Order created");
  };
  const cart = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <FlatList
        data={cart}
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
        <Text style={{ color: "#fff", fontSize: 18 }}>Checkout</Text>
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
