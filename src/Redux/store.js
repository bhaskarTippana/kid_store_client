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
    buyProductsCart:[]
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
      console.log(payload);
      console.log(state.user.cart);
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
      console.log(payload);
      return {
        ...state,
        user: {
          ...state.user,
          buyCart: payload,
        },
      };

    case "INCREASE_PRODUCT":
      console.log(payload);
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...payload],
        },
      };

    case "DECREASE_PRODUCT":
      console.log(payload);
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...payload],
        },
      };

      case "BUY_CART_PRODUCTS":
        console.log(payload);
      return {
        ...state,user:{
          ...state.user,buyProductsCart:payload
        }
      }

    default:
      return state;
  }
};

let store = createStore(rootReducer);

export { store };
