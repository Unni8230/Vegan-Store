const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const initDB = require("../db/database");

router.post("/", async (request, response) => {
  try {
    const db = await initDB();
    const { name, username, email, password } = request.body;
    const validatedUsername = username?.trim();
    const validatedEmail = email?.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRegisterQuery = `insert into users(name, username, email, password)
        values(?,?,?,?)`;
    const existingUserEmail = await db.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const existingUserName = await db.get(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUserEmail) {
      return response
        .status(409)
        .json({ success: false, error: "Email already registered!" });
    } else if (existingUserName) {
      return response
        .status(409)
        .json({ success: false, error: "Username already registered!" });
    } else {
      await db.run(userRegisterQuery, [name, validatedUsername, validatedEmail, hashedPassword]);
      return response
        .status(201)
        .json({ success: true, message: "User Registration Successful!" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success: false, error: "Server Error" });
  }
});
module.exports = router;
