import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { ProductScreenNavigationProp } from "../../types/types";
import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../store/apiSlice";
import { MotiView } from "moti";

type Props = {
  navigation: ProductScreenNavigationProp;
};

export default function ProductScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProductsQuery({});
  const [displayedCount, setDisplayedCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return error ? (
      <Text style={{ textAlign: "center", color: "red" }}>
        Error fetching the products
      </Text>
    ) : null;
  }

  const products = data?.data;

  return (
    <FlatList
      data={products.slice(0, displayedCount)}
      renderItem={({ item, index }) => (
        <MotiView
          style={styles.itemContainer}
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1000 + index * 200 }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Product Details", { productId: item._id });
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        </MotiView>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (displayedCount < products.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setDisplayedCount((oldCount) => oldCount + 6);
            setLoadingMore(false);
          }, 2000);
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        return loadingMore ? (
          <ActivityIndicator
            size="large"
            color="black"
          />
        ) : null;
      }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    width: "50%",
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  name: { fontSize: 16, fontWeight: "500", textAlign: "center" },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "center",
    borderRadius: 10,
    marginRight: 0,
  },
});
