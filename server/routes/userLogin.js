const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const initDB = require("../db/database");

router.post("/", async (request, response) => {
  try {
    const db = await initDB();
    const { username, password } = request.body;
    const getUserQuery = `select * from users where username = ?`;
    const userDetails = await db.get(getUserQuery, [username]);
    if (userDetails === undefined) {
      return response
        .status(400)
        .json({ success: false, error: "Invalid User!" });
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        userDetails.password
      );
      if (isPasswordMatched) {
        const payload = { username: username };
        const jwtToken = jwt.sign(payload, "User_Secret_Token");
        return response
          .status(200)
          .json({ success: true, jwt_token: jwtToken });
      } else {
        return response
          .status(400)
          .json({ success: false, error: "Invalid Password!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
