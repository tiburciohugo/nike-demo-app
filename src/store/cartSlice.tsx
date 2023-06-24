import { CartItem } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: CartItem[];
  deliveryFee: number;
  freeDeliveryMinimum: number;
  subtotal: number;
};

type NewProductPayload = { product: CartItem["product"]; size: number };
type ItemPayload = { id: string };
type QuantityPayload = { id: string; quantity: number };

const initialState: CartState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryMinimum: 200,
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<NewProductPayload>) => {
      const newProduct = action.payload.product;
      const index = state.items.findIndex(
        (item) => item.product._id === newProduct._id
      );
      if (index >= 0) {
        state.items[index].quantity += 1;
      } else {
        state.items.push({
          product: newProduct,
          quantity: 1,
          size: action.payload.size,
        });
      }

      // After adding item, update subtotal
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<ItemPayload>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload.id
      );
    },
    changeQuantity: (state, action: PayloadAction<QuantityPayload>) => {
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.id
      );
      if (index >= 0) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
  },
});
