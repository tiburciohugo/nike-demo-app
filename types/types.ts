import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  "Product Details": { productId: string } ;
  "Shopping Cart": undefined;
  "Product Screen": undefined;
};

export type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Product Screen"
>;

export type CartItem = {
  product: { _id: string; image: string; name: string; price: number };
  size: number;
  quantity: number;
};
