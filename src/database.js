const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "..", "data");
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = process.env.DB_PATH || path.join(dataDir, "library.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT UNIQUE,
    total_copies INTEGER NOT NULL,
    available_copies INTEGER NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    student_no TEXT NOT NULL UNIQUE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    issue_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    return_date TEXT,
    status TEXT NOT NULL CHECK(status IN ('ISSUED', 'RETURNED')),
    fine REAL NOT NULL DEFAULT 0,
    FOREIGN KEY(book_id) REFERENCES books(id),
    FOREIGN KEY(student_id) REFERENCES students(id)
  )`);
  db.get("SELECT COUNT(*) AS count FROM books", (err, row) => {
    if (!err && row.count === 0) {
      db.run("INSERT INTO books (title, author, isbn, total_copies, available_copies) VALUES (?, ?, ?, ?, ?)",
        ["The Alchemist", "Paulo Coelho", "9780061122415", 4, 4]);
      db.run("INSERT INTO books (title, author, isbn, total_copies, available_copies) VALUES (?, ?, ?, ?, ?)",
        ["Clean Code", "Robert C. Martin", "9780132350884", 3, 3]);
    }
  });
});

module.exports = db;
