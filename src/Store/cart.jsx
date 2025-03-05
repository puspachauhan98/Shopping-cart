/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts")) ?? []
    : [], // Always ensure an array
  statusTab: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity } = action.payload;

      state.items = state.items ?? []; // Ensure `items` is always an array

      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }

      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;

      state.items = state.items ?? []; // Ensure `items` is always an array

      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (indexProductId !== -1) {
        if (quantity > 0) {
          state.items[indexProductId].quantity = quantity;
        } else {
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        }
        localStorage.setItem("carts", JSON.stringify(state.items));
      }
    },

    toggleStatusTab(state) {
      state.statusTab = !state.statusTab; // Proper toggle logic
    },
  },
});

export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;
