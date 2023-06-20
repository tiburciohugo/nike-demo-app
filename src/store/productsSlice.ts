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

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
};

const initialState: ProductsState = {
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
