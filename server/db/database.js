const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../shop.db'); 
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Failed to connect to DB:', err);
  else console.log('Connected to SQLite DB 🟢');
});

module.exports = db;