import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProductScreenNavigationProp } from "@/types/types";

type Props = {
  navigation: ProductScreenNavigationProp;
};

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: "white"}}}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }: Props) => ({
            headerTitleAlign: "center",
            headerRight: () => (
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
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "containedModal" }}
        />
        <Stack.Screen
          name="Shopping Cart"
          component={ShoppingCart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
