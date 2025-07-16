import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import veganStoreContext from "./Context/context";

class App extends Component {
  state = {
    activeMenu: "Home",
  };

  changeActiveMenu = (id) => {
    this.setState({
      activeMenu: id,
    });
  };

  render() {
    const { activeMenu } = this.state;
    return (
      <veganStoreContext.Provider
        value={{ activeMenu, changeActiveMenu: this.changeActiveMenu }}
      >
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
