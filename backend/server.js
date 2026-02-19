import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kunnu31",
  database: "library_db"
});

db.connect((err) => {
  if (err) {
    console.log(" DB connection failed:", err);
  } else {
    console.log(" Connected to MySQL");
  }
});

// ================= ROUTES =================

// Get all books
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Add book
app.post("/books", (req, res) => {
  const { name, author, category, quantity } = req.body;

  const sql =
    "INSERT INTO books (name, author, category, quantity) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, author, category, quantity], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book added successfully" });
  });
});

// Delete book
app.delete("/books/:id", (req, res) => {
  db.query("DELETE FROM books WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book deleted" });
  });
});

// Update book
app.put("/books/:id", (req, res) => {
  const { name, author, category, quantity } = req.body;

  const sql =
    "UPDATE books SET name=?, author=?, category=?, quantity=? WHERE id=?";

  db.query(
    sql,
    [name, author, category, quantity, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book updated" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
