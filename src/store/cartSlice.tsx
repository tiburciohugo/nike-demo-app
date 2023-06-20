import { CartItem } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: CartItem[];
  deliveryFee: number;
  freeDeliveryMinimum: number;
};

type NewProductPayload = { product: CartItem["product"]; size: number };
type ItemPayload = { id: string };
type QuantityPayload = { id: string; quantity: number };

const initialState: CartState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryMinimum: 200,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<NewProductPayload>) => {
      const newProduct = action.payload.product;
      const index = state.items.findIndex(
        (item) => item.product.id === newProduct.id
      );
      if (index >= 0) {
        state.items[index].quantity += 1;
        return;
      }
      state.items.push({
        product: newProduct,
        quantity: 1,
        size: action.payload.size,
      });
    },
    removeFromCart: (state, action: PayloadAction<ItemPayload>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.id
      );
    },
    changeQuantity: (state, action: PayloadAction<QuantityPayload>) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (index >= 0) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
  },
});
