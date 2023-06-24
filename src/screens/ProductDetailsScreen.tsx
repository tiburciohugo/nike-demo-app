import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from "../store/apiSlice";
import { RootStackParamList } from "@/types/types";
import { RouteProp } from "@react-navigation/native";

export default function ProductDetailsScreen({
  route,
}: {
  route: RouteProp<RootStackParamList, "Product Details">;
}) {
  const { productId } = route.params;
  const { data, error, isLoading } = useGetProductQuery(productId);
  const product = data?.data;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const addToCart = useCallback(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      dispatch(
        cartSlice.actions.addCartItem({ product, size: product.sizes[0] })
      );
    } else {
      console.error("Product or product sizes not available");
    }
  }, [dispatch, product]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return error ? (
      <Text style={{ textAlign: "center", color: "red" }}>
        Error fetching the product
      </Text>
    ) : null;
  }

  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width, aspectRatio: 1 }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <TouchableOpacity
        onPress={addToCart}
        style={styles.button}
      >
        <Text style={styles.buttontext}>Add to cart</Text>
      </TouchableOpacity>

      {/* Navigation icon */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 34, fontWeight: "500", marginVertical: 10 },
  price: {
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
    lineHeight: 30,
    fontWeight: "300",
    paddingBottom: 70,
  },
  button: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "black",
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
