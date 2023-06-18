import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import ProductScreen from "./src/screens/ProductScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import ShoppingCart from "./src/screens/ShoppingCart";


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Products</Text> */}
      {/* <ProductScreen /> */}
      {/* <ProductDetailsScreen /> */}
      <ShoppingCart />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf7fd",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 20,
    // paddingVertical: 30,
  },
  title: { fontSize: 34, fontWeight: "bold", textAlign: "center", marginTop: 40 },
});
