import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

// export interface RootStackParamList {
//   Home: undefined;
//   "Product Screen": undefined;
//   "Product Details": undefined;
//   "Shopping Cart": undefined;
// }

export type RootStackParamList = {
  "Product Details": undefined;
  "Shopping Cart": undefined;
  "Product Screen": undefined;
};

export type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Product Screen"
>;
