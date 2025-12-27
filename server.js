const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('.'));

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
    console.log(req.body);
    const { name = req.body.name.trim(), email = req.body.email.trim(), phone = req.body.phone.trim(), address = req.body.address.trim(), message = req.body.message.trim() } = req.body;

    if (!name || !email || !phone || !address || !message) {
        return res.status(400).json({ error: 'Please fill out all fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    
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

app.get('/requests', (req, res) => {
    const sql = `
    SELECT * FROM catering_requests
    ORDER BY created_at DESC
    `;
    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to get requests' });
        } else {
            res.status(200).json(rows);
        }
    });
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

