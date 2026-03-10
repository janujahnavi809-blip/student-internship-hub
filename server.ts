import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("internships.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    internship_id INTEGER NOT NULL,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    resume_url TEXT,
    cover_letter TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (internship_id) REFERENCES internships (id)
  );
`);

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM internships").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare("INSERT INTO internships (title, company, location, description, category) VALUES (?, ?, ?, ?, ?)");
  insert.run("Frontend Developer Intern", "TechFlow", "Remote", "Work with React and Tailwind to build modern UIs.", "Engineering");
  insert.run("Product Design Intern", "Creative Studio", "New York, NY", "Help design user-centric mobile applications.", "Design");
  insert.run("Data Science Intern", "Insight Analytics", "San Francisco, CA", "Analyze large datasets to drive business decisions.", "Data");
  insert.run("Marketing Intern", "Growth Co", "Remote", "Assist in social media campaigns and content strategy.", "Marketing");
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API Routes
  // 1. GET API: Fetch all internships
  app.get("/api/internships", (req, res) => {
    const internships = db.prepare("SELECT * FROM internships").all();
    res.json(internships);
  });

  // 2. POST API: Submit an application
  app.post("/api/applications", (req, res) => {
    const { internship_id, student_name, student_email, cover_letter } = req.body;
    
    if (!internship_id || !student_name || !student_email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const stmt = db.prepare("INSERT INTO applications (internship_id, student_name, student_email, cover_letter) VALUES (?, ?, ?, ?)");
      const result = stmt.run(internship_id, student_name, student_email, cover_letter);
      res.status(201).json({ id: result.lastInsertRowid, message: "Application submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
