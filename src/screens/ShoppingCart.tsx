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


const ShoppingCartTotals = () => {
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
  const subtotal = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text>Subtotal</Text>
        <Text style={{ fontSize: 16, color: "#a0a0a0" }}>
          {subtotal === 0 ? 0.0 : subtotal.toFixed(2)} USD
        </Text>
      </View>

      <View style={styles.row}>
        <Text>Delivery</Text>
        <Text style={{ fontSize: 16, color: "#a0a0a0" }}>
          {subtotal === 0 ? 0.0 : deliveryFee.toFixed(2)} USD
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>
          {subtotal === 0 ? 0.0 : total.toFixed(2)} USD
        </Text>
      </View>
    </View>
  );
}
export default function ShoppingCart() {
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
        onPress={() => {}}
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
