import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (items) => items.pizzaId !== action.payload,
      );
    },
    increaseItem(state, action) {
      const item = state.cart.find((items) => items.pizzaId === action.payload);
      item.quantity = item.quantity + 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItem(state, action) {
      const item = state.cart.find((items) => items.pizzaId === action.payload);
      item.quantity = item.quantity - 1;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity <= 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, decreaseItem, increaseItem, deleteItem, clearCart } =
  cartSlice.actions;

export const getCart = (state) => state?.cart?.cart;

export const getCartQuanity = (state) =>
  state.cart.cart.reduce(
    (totalQuantity, pizza) => totalQuantity + pizza.quantity,
    0,
  );

export const getTotalCartPrice = (state) =>
  state.cart.cart
    .reduce((totalPrice, pizza) => totalPrice + pizza.totalPrice, 0)
    .toFixed(2);

export const getCartQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
