const express = require("express");
const cors = require("cors");
const app = express();

const productsRoute = require("./routes/products");
const userLoginRoute = require("./routes/userLogin");
const userRegisterRoute = require("./routes/userRegister");
const addToCartToute = require("./routes/addToCart");
const fetchCartRoute = require("./routes/cartDetails");
const removeCartItemRoute = require("./routes/removeCartItem")
const updateproductQuantityRoute = require("./routes/updateProductQuantity")

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoute);
app.use("/api/user", userLoginRoute);
app.use("/api/user/register", userRegisterRoute);
app.use("/api/user/add-to-cart", addToCartToute);
app.use("/api/user/cart", fetchCartRoute);
app.use("/api/user/remove-cart-item", removeCartItemRoute)
app.use("/api/user/update-product-quantity", updateproductQuantityRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vegan store backend running on http://localhost:${PORT} 🌿`);
});
