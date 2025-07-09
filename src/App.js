import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts"
import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
