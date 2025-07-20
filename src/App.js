import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import veganStoreContext from "./Context/context";

class App extends Component {
  state = {
    cartList: [],
    isLoggedIn: false,
    activeMenu: "Home",
  };

  componentDidMount() {
    this.fetchCartDetails();
  }

  refreshCart = async () => {
    await this.fetchCartDetails();
  };

  logOut = async () => {
    Cookies.remove("jwt_token");
    this.setState({
      isLoggedIn: false,
    });
    await this.fetchCartDetails();
  };

  UpdateCartQuantity = async (userId, productId, type) => {
    const jwtToken = Cookies.get("jwt_token");
    const updateData = { userId, productId, type };
    const updateCartUrl =
      "http://localhost:5000/api/user/update-product-quantity";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updateData),
    };
    const updateCartItemresponse = await fetch(updateCartUrl, options);
    const updatedCart = await updateCartItemresponse.json();
    if (updatedCart.success) {
      await this.fetchCartDetails();
    }
  };

  removeCartItem = async (userId, productId) => {
    const jwtToken = Cookies.get("jwt_token");
    const removeData = { userId, productId };
    const removeCartUrl = "http://localhost:5000/api/user/remove-cart-item";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(removeData),
    };
    const removeCartItemresponse = await fetch(removeCartUrl, options);
    const updatedCart = await removeCartItemresponse.json();
    if (updatedCart.success) {
      await this.fetchCartDetails();
    }
  };

  fetchCartDetails = async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      if (jwtToken) {
        this.setState({
          isLoggedIn: true,
        });
        const fetchCartUrl = "http://localhost:5000/api/user/cart";
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const cartResponse = await fetch(fetchCartUrl, options);
        const cartData = await cartResponse.json();
        if (cartData.success) {
          this.setState({
            cartList: cartData,
          });
        }
      }
    } catch (error) {
      toast.error("Cart sync failed 😞");
    }
  };

  changeActiveMenu = (id) => {
    this.setState({
      activeMenu: id,
    });
  };

  render() {
    const { activeMenu, cartList, isLoggedIn } = this.state;
    return (
      <veganStoreContext.Provider
        value={{
          cartList,
          isLoggedIn,
          activeMenu,
          logOut: this.logOut,
          changeActiveMenu: this.changeActiveMenu,
          refreshCart: this.refreshCart,
          removeCartItem: this.removeCartItem,
          UpdateCartQuantity: this.UpdateCartQuantity,
        }}
      >
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </AnimatePresence>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
        </BrowserRouter>
      </veganStoreContext.Provider>
    );
  }
}

export default App;
