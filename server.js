const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin:https://consultancy-project-frontend-eight.vercel.app
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/chat', require('./routes/chat'));
app.get("/", (req,res)=>{
    res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
