import { legacy_createStore } from "redux";

let initialState = {
  isLogin: false,
  user: {
    _id: "",
    firstName: "",
    email: "",
    wishlist: [],
    cart: [],
    buyCart: [],
  },
  myProducts: [],
};

const rootReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "USER_LOGIN":
      console.log(payload);
      return { ...state, isLogin: payload };

    case "MY_PRODUCTS":
      return { ...state, myProducts: [...payload] };

    case "USER_DATA":
      console.log(payload);
      return { ...state, user: { ...payload } };

    case "ADD_TO_CART":
      console.log([...payload]);

      return {
        ...state,
        user: {
          ...state.user.cart,
          cart: [...payload],
        },
      };

    case "DELETE_FROM_CART":
      return {
        ...state,
        user: {
          ...state.user,
          cart: state.user.cart.filter((item) => item._id !== payload._id),
        },
      };

    case "ADD_TO_WISHLIST":
      console.log(payload);
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: [...state.user.wishlist, ...payload],
        },
      };

    case "DELETE_FROM_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: state.user.wishlist.filter(
            (item) => item._id !== payload._id
          ),
        },
      };

    case "SINGLE_PRODUCT_ADD":
      return {
        ...state,
        user: {
          ...state.user,
          buyCart: [...payload],
        },
      };

    case "INCREASE_PRODUCT":
      const updatedCart = state.user.cart.map((item) =>
        item._id === payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        ...state,
        user: {
          ...state.user,
          cart: updatedCart,
        },
      };

    case "DECREASE_PRODUCT":
      const updatedCarts = state.user.cart.map((item) =>
        item._id === payload ? { ...item, quantity: item.quantity - 1 } : item
      );
      return {
        ...state,
        user: {
          ...state.user,
          cart: updatedCarts,
        },
      };

    default:
      return state;
  }
};

let store = legacy_createStore(rootReducer);

export default store;
