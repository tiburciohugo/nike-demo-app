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
  ViewabilityConfig,
  ViewToken,
  Animated,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from "../store/apiSlice";
import { RootStackParamList } from "@/types/types";
import { RouteProp } from "@react-navigation/native";

type ViewableItem<T> = ViewToken & {
  item: T;
};
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
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const addToCart = useCallback(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      dispatch(
        cartSlice.actions.addCartItem({ product, size: product.sizes[0] })
      );
    } else {
      console.error("Product or product sizes not available");
    }
  }, [dispatch, product]);

  const [activeIndex, setActiveIndex] = useState(0);

  // const updateIndex = ({
  //   viewableItems,
  // }: {
  //   viewableItems: Array<ViewableItem<string>>;
  //   changed: Array<ViewableItem<string>>;
  // }) => {
  //   setActiveIndex(viewableItems[0].index || 0);
  // };
  const updateIndex = React.useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: Array<ViewableItem<string>>;
      changed: Array<ViewableItem<string>>;
    }) => {
      setActiveIndex(viewableItems[0].index || 0);
    },
    [] // Add any dependencies here. If there are none, you can leave this as an empty array.
  );

  const viewConfigRef = React.useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 50,
  });
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
          keyExtractor={(_, index) => index.toString()}
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
          onViewableItemsChanged={updateIndex}
          viewabilityConfig={viewConfigRef.current}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />

        <View style={styles.pagination}>
          {product.images.map((_: string, i: number) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  { width: dotWidth },
                  i === activeIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            );
          })}
        </View>

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
  pagination: {
    flexDirection: "row",
    position: "absolute",
    top: 360,
    alignSelf: "center",
    zIndex: 1,
    borderRadius: 5,
    padding: 5,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: "#374A67",
    height: 10,
    width: 20, // Increase this value to make the dot wider
    borderRadius: 5,
  },
  inactiveDot: {
    backgroundColor: "#9DA3A4",
  },
});
