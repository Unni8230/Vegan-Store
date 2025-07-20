import React from "react";

const veganStoreContext = React.createContext({
  isLoggedIn: "",
  cartList: [],
  activeMenu: "",
  logOut: () => {},
  removeCartItem: () => {},
  refershCart: () => {},
  increaseCartQuantity: () => {},
  UpdateCartQuantity: () => {},
  changeActiveMenu: () => {},
});
export default veganStoreContext;
