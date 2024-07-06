import { legacy_createStore as createStore } from "redux";

let initialState = {
  isLogin: false,
  user: {
    _id: "",
    firstName: "",
    email: "",
    wishlist: [],
    cart: [],
    buyCart: [],
    buyProductsCart: [],
    myOrders: [],
    address: {},
  },
  myProducts: [],
  Products:[],
};

const rootReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "USER_LOGIN":
      return { ...state, isLogin: payload };

      case "PRODUCTS":
        return { ...state, Products: [...payload] };

    case "MY_PRODUCTS":
      return { ...state, myProducts: [...payload] };

    case "USER_DATA":
      return { ...state, user: { ...payload } };

    case "ADD_TO_CART":
      const combinedCart = [...state.user.cart, ...payload];
      const uniqueCart = combinedCart.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t._id === item._id)
      );

      return {
        ...state,
        user: {
          ...state.user,
          cart: uniqueCart,
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
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: payload,
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
          buyCart: payload,
        },
      };

    case "INCREASE_PRODUCT":
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...payload],
        },
      };

    case "DECREASE_PRODUCT":
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...payload],
        },
      };

    case "BUY_CART_PRODUCTS":
      return {
        ...state,
        user: {
          ...state.user,
          buyProductsCart: payload,
        },
      };

    case "MY_ORDERS":
      return {
        ...state,
        user: {
          ...state.user,
          myOrders: payload,
        },
      };

    case "UPDATE_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          address: { ...payload },
        },
      };

    default:
      return state;
  }
};

let store = createStore(rootReducer);

export { store };
