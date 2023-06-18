import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CartListItem from "../components/CartListItem";
import cart from "../data/cart";

const ShoppingCartTotals = () => (
  <View style={styles.totalsContainer}>
    <View style={styles.row}>
      <Text>Subtotal</Text>
      <Text style={{ fontSize: 16, color: "#a0a0a0" }}>410,00 USD</Text>
    </View>

    <View style={styles.row}>
      <Text>Delivery</Text>
      <Text style={{ fontSize: 16, color: "#a0a0a0" }}>10,00 USD</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.textBold}>Delivery</Text>
      <Text style={styles.textBold}>420,00 USD</Text>
    </View>
  </View>
);
export default function ShoppingCart() {
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
