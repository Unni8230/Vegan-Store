const express = require("express");
const router = express.Router();
const initDB = require("../db/database");
const jwt = require("jsonwebtoken");

router.post("/", async (request, response) => {
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
            const { userId, productId, type } = request.body;
            const db = await initDB();
            const productDetails = await db.get(
              `select * from cart_items where user_id = ? and product_id = ?`,
              [userId, productId]
            );
            if (productDetails.quantity === 1 && type === "minus") {
              const removecartQuery = `delete from cart_items where user_id = ? and product_id = ?`;
              await db.run(removecartQuery, [userId, productId]);
              response.status(200).json({
                success: true,
                message: "Cart Item Removed Sucessfully",
              });
            } else {
              let updatedQuantity =
                type === "plus"
                  ? productDetails.quantity + 1
                  : productDetails.quantity - 1;
              let updatecartQuery = `update cart_items set quantity = ? where user_id = ? and product_id = ?`;

              await db.run(updatecartQuery, [
                updatedQuantity,
                userId,
                productId,
              ]);
              response.status(200).json({
                success: true,
                message: "Product Quantity Updated Sucessfully",
              });
            }
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
