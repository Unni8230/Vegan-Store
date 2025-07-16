const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const initDB = require("../db/database");

router.post("/", async (request, response) => {
  try {
    const db = await initDB();
    const { product_id, quantity, jwtToken } = request.body;
    const decoded = jwt.verify(jwtToken, "User_Secret_Token");
    const userId = decoded.user_id;
    if (!userId) {
      return response
        .status(404)
        .json({ success: false, error: "User not found" });
    }
    const alreadyExistingProductQuery = `select * from cart_items where product_id = ?`;
    const existingProduct = await db.get(alreadyExistingProductQuery, [
      product_id,
    ]);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
      const updateQuantityQuery = `update cart_items set quantity = ?
       where product_id = ?`;
      await db.run(updateQuantityQuery, [newQuantity, product_id]);
      return response.status(201).json({
        success: true,
        message: "Product Added to the Cart Successfully!",
      });
    } else {
      const addToCartQuery = `insert into cart_items(user_id, product_id, quantity)
    values(?,?,?)`;
      await db.run(addToCartQuery, [userId, product_id, quantity]);
      return response.status(201).json({
        success: true,
        message: "Product Added to the Cart Successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success: false, error: error });
  }
});
module.exports = router;
