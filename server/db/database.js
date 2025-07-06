// db/database.js
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function initDB() {
  const db = await open({
    filename: path.resolve(__dirname, '../../shop.db'), // adjust path if needed
    driver: sqlite3.Database
  });

  console.log('✅ Connected to SQLite (async)');
  return db;
}

module.exports = initDB;