const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./db/database');

const app = express();
const PORT = 3000;

// Initialize database
initializeDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/my-events', require('./routes/registrations'));
app.use('/api/events', require('./routes/registrations'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/certificate', require('./routes/reports'));

// Catch-all: serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 =============================================`);
    console.log(`   Event Management System is running!`);
    console.log(`   🌐 URL: http://localhost:${PORT}`);
    console.log(`   📊 API: http://localhost:${PORT}/api`);
    console.log(`   =============================================`);
    console.log(`\n📋 Default Accounts:`);
    console.log(`   Admin:    admin@college.edu / admin123`);
    console.log(`   Student1: student1@college.edu / pass123`);
    console.log(`   Student2: student2@college.edu / pass123\n`);
});
