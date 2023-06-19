import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

type Product = {
  id: string;
  image: string;
  images: string[];
  name: string;
  price: number;
  sizes: number[];
  description: string;
};

type State = {
  products: Product[];
  selectedProduct: Product | null;
};

const initialState: State = {
  products: products,
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
        const productId = action.payload;
      state.selectedProduct = state.products.find((product) => product.id === productId) || null;
    },
  },
});
