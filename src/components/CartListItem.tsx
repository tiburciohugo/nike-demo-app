import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type CartListItemProps = {
  cartItem: {
    product: { _id: string; image: string; name: string; price: number };
    size: number;
    quantity: number;
  };
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const increaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        id: cartItem.product._id,
        quantity: cartItem.quantity + 1,
      })
    );
  };

  const decreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      dispatch(
        cartSlice.actions.changeQuantity({
          id: cartItem.product._id,
          quantity: cartItem.quantity - 1,
        })
      );
    } else {
      dispatch(cartSlice.actions.removeFromCart({ id: cartItem.product._id }));
    }
  };

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>No items in cart</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image }}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{cartItem.product.name}</Text>
        <Text style={styles.size}>Size {cartItem.size}</Text>

        <View style={styles.footer}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <AntDesign
              name="minuscircleo"
              size={24}
              color="gray"
            />
          </TouchableOpacity>
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <AntDesign
              name="pluscircleo"
              size={24}
              color="gray"
            />
          </TouchableOpacity>
          <Text style={styles.itemTotal}>{`$ ${
            cartItem.product.price * cartItem.quantity
          }`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 20,
  },
  image: {
    width: "40%",
    aspectRatio: 1,
  },
  name: {
    fontWeight: "500",
    fontSize: 18,
  },
  size: {
    fontSize: 16,
    color: "gray",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  itemTotal: {
    fontSize: 16,
    marginLeft: "auto",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});

export default CartListItem;
