import React from "react";

const veganStoreContext = React.createContext({
  cartList: [],
  activeMenu: "",
  addToCartlist: () => {},
  changeActiveMenu: () => {},
});
export default veganStoreContext;
