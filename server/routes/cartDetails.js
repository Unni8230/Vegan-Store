const express = require("express");
const router = express.Router();
const initDB = require("../db/database");
const jwt = require("jsonwebtoken");

router.get("/", async (request, response) => {
  let jwtToken;
  const authHeaders = request.headers["authorization"];
  if (authHeaders !== undefined) {
    jwtToken = authHeaders.split(" ")[1];
    if (jwtToken === undefined) {
      response
        .status(401)
        .json({ success: false, error: "Invalid JWT Token, Access Denied!" });
    } else {
      jwt.verify(jwtToken, "User_Secret_Token", async (error, payload) => {
        if (error) {
          response.status(401).json({
            success: false,
            error: "Invalid JWT Token, Access Denied!",
          });
        } else {
          try {
            const userData = payload;
            const name = userData.name;
            const userId = userData.user_id;
            const db = await initDB();
            const cartQuery = `select users.id as user_id, products.id as product_id, 
            cart_items.quantity as quantity, products.title as title, products.description as description,
            products.price as price, products.image_url as image_url, products.stock_quantity as stock_quantity, 
            products.category as category, products.organic as is_organic
            from cart_items join products on cart_items.product_id = products.id join users on users.id = cart_items.user_id
            where cart_items.user_id = ? order by cart_items.added_at desc`;
            const cart_items_details = await db.all(cartQuery, [userId]);
            response.status(200).json({
              success: true,
              name,
              userId,
              cart_items: cart_items_details,
            });
          } catch (error) {
            console.log(error);
            response
              .status(500)
              .json({ success: false, message: "Cart Sync Error!" });
          }
        }
      });
    }
  } else {
    response.status(401).json({
      success: false,
      error: "Invalid JWT Token, Access Denied!",
    });
  }
});
module.exports = router;
