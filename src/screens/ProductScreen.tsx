import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ProductScreenNavigationProp } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { productsSlice } from "../store/productsSlice";

type Props = {
  navigation: ProductScreenNavigationProp;
};

export default function ProductScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate("Product Details")
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
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
