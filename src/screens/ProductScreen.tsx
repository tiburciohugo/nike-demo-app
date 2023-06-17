import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";
import products from "../data/products";

export default function ProductScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  name: { fontSize: 16, fontWeight: "500", textAlign: "center" },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
