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
            console.log("Trigerred")
            const userData = payload;
            const username = userData.username;
            const userId = userData.user_id;
            const db = await initDB();
            const cartQuery = `select * from cart_items join products on cart_items.product_id = products.id
            where cart_items.user_id = ?`;
            const cart_items_details = await db.all(cartQuery, [userId]);
            console.log(cart_items_details);
            response.status(200).json({success: true, message:"Cart Synced Successfully!"})
          } catch (error) {
            console.log(error);
            response.status(500).json({success: false, message:"Cart Sync Error!"})
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
