import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { CoffeeItemsType, Id } from "../../types/coffeItemsType";

export type CartItem = CoffeeItemsType & {
  qty: number;
};

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CoffeeItemsType>) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },
    increaseQty: (state, action: PayloadAction<Id>) => {
      const existing = state.items.find((i) => i.id === action.payload);
      if (existing) existing.qty += 1;
    },

    decreaseQty: (state, action: PayloadAction<Id>) => {
      const existing = state.items.find((i) => i.id === action.payload);
      if (!existing) return;
      existing.qty -= 1;
      if (existing.qty <= 0) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<Id>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
