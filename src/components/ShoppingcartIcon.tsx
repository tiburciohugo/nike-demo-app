import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProductScreenNavigationProp } from "@/types/types";
import { useNavigation } from "@react-navigation/native";

type CartProps = {
  navigation: ProductScreenNavigationProp;
};

export default function ShoppingcartIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Shopping Cart")}
      style={{ flexDirection: "row" }}
    >
      <FontAwesome5
        name="shopping-cart"
        size={18}
        color={"gray"}
      />
      <Text
        style={{
          marginLeft: 5,
          fontWeight: "500",
          backgroundColor: "orange",
          borderRadius: 15,
          position: "absolute",
          right: -9,
          top: -10,
          width: 18,
          height: 18,
          textAlign: "center",
          textAlignVertical: "center",
          lineHeight: 18,
        }}
      >
        1
      </Text>
    </TouchableOpacity>
  );
}
