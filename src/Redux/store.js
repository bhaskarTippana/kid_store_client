/* eslint-disable no-case-declarations */
// eslint-disable-next-line no-unused-vars
import { legacy_createStore } from "redux";
let intialState = {
  user: {
    _id: "",
    firstName: "",
    email: "",
    wishlist: [],
    cart: [],
  },
  myProducts: [],
};
const rootReducer = (state = intialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case "USER_DATA":
      return { ...state, user: payload };
    case "MY_PRODUCTS":
      return { ...state, myProducts: [...payload] };
    case "ADD_TO_CART":
      let user = state.user;
      user.cart = [...user.cart,payload]
      return { ...state, user };
    default:
      return state;
  }
};

let store = legacy_createStore(rootReducer);

export default store;
