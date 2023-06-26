import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or any other library for the icon
import React from "react";
import { useGetOrderByReferenceQuery } from "../store/apiSlice";
import { FlatList } from "react-native-gesture-handler";
import currency from "currency.js";

type Item = {
  product: {
    price: number;
  };
  quantity: number;
};

export default function TrackOrderScreen() {
  const [ref, setRef] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchPerformed, setSearchPerformed] = React.useState(false);

  const { data, error, isLoading } = useGetOrderByReferenceQuery(searchTerm, {
    skip: !searchPerformed,
  });

  const handleSearch = () => {
    setSearchTerm(ref);
    setSearchPerformed(true);
  };

  console.log("object", data);

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={ref}
          onChangeText={setRef}
          placeholder="Your order reference"
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleSearch}
        >
          <Ionicons
            name="ios-search"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator style={styles.result} />}

      {searchPerformed && data?.status !== "OK" && (
        <Text style={styles.result}>Order not found</Text>
      )}

      {data?.status === "OK" && (
        <View style={styles.result}>
          <FlatList
            data={data?.data.items}
            keyExtractor={(item) => item.product._id}
            renderItem={({ item }) => (
              <View style={styles.productsContainer}>
                <Image
                  source={{ uri: item.product.image }}
                  style={{ width: 50, height: 50, borderRadius: 10 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    marginLeft: 10,
                    gap: 5,
                  }}
                >
                  <Text style={styles.bold}>{item.product.name}</Text>
                  <Text>x</Text>
                  <Text style={styles.bold}>{item.quantity}</Text>
                </View>

                <Text style={{ textAlign: "center" }}>
                  {currency(item.product.price * item.quantity, {
                    precision: 2,
                  }).format()}
                </Text>
              </View>
            )}
          />
          <Text style={styles.bold}>
            Total:{" "}
            {currency(
              data?.data.items.reduce(
                (acc: number, item: Item) =>
                  acc + item.product.price * item.quantity,
                0
              ),
              { precision: 2 }
            ).format()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
  },
  result: {
    textAlign: "center",
    marginTop: 10,
  },
  bold: {
    textAlign: "center",
    fontWeight: "bold",
  },
  productsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
