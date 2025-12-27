const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database('bakery.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }

    db.run(`
        CREATE TABLE IF NOT EXISTS catering_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Catering request table created successfully');
            }
        }
    );
});

app.post('/submit-request', (req, res) => {
    const { name, email, phone, address, message } = req.body;
    const sql = `
    INSERT INTO catering_requests (name, email, phone, address, message) 
    VALUES (?, ?, ?, ?, ?)`;
    const params = [name, email, phone, address, message];
    db.run(sql, params, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to submit request' });
        } else {
            res.status(200).json({ message: 'Request submitted successfully' });
        }
    });
});

