import { CartItem } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: CartItem[];
  deliveryFee: number;
  freeDeliveryMinimum: number;
  subtotal: number;
  total: number;
};

type NewProductPayload = { product: CartItem["product"]; size: number };
type ItemPayload = { id: string };
type QuantityPayload = { id: string; quantity: number };

const initialState: CartState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryMinimum: 200,
  subtotal: 0,
  total: 0,
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

      calculateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<ItemPayload>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload.id
      );

      calculateTotals(state);
    },
    changeQuantity: (state, action: PayloadAction<QuantityPayload>) => {
      const index = state.items.findIndex(
        (item) => item.product._id === action.payload.id
      );
      if (index >= 0) {
        state.items[index].quantity = action.payload.quantity;
      }

      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.total = 0;
      state.deliveryFee = 0;
    },
  },
});

function calculateTotals(state: CartState) {
  state.subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  state.deliveryFee =
    state.items.length === 0
      ? 0
      : state.subtotal >= state.freeDeliveryMinimum
      ? 0
      : initialState.deliveryFee;

  state.total = state.subtotal + state.deliveryFee;
}
