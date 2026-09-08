const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "shopshere_db",
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 5
});

app.use(express.static(path.join(__dirname, "public")));

const allowed = {
  products: "SELECT product_id, product_name, category_id, stock, price FROM products ORDER BY product_id LIMIT 100",
  users: "SELECT user_id, name, email, phno FROM users ORDER BY user_id LIMIT 100",
  orders: "SELECT order_id, user_id, order_date FROM orders ORDER BY order_date DESC, order_id DESC LIMIT 100",
  payments: "SELECT payment_id, order_id, payment_mode, payment_status, payment_date, amount FROM payments ORDER BY payment_id DESC LIMIT 100",
  reviews: "SELECT review_id, user_id, order_id, product_id, rating, feedback FROM reviews ORDER BY review_id DESC LIMIT 100",
  audit_log: "SELECT log_id, action, table_name, old_value, new_value, action_time, message FROM audit_log ORDER BY action_time DESC, log_id DESC LIMIT 100"
};

app.get("/api/table/:name", async (req, res) => {
  const sql = allowed[req.params.name];
  if (!sql) return res.status(400).json({ error: "Table not available" });
  try {
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/api/health", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS connected");
    res.json({ ok: true, ...rows[0] });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Database connection failed" });
  }
});

app.listen(PORT, () => console.log(`ShopSphere running on port ${PORT}`));
