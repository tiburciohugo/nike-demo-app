import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import ProductScreen from "./src/screens/ProductScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import ShoppingCart from "./src/screens/ShoppingCart";
import Navigation from "./src/Navigation";
import { Provider } from "react-redux";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaView>
    </Provider>
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
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
});
