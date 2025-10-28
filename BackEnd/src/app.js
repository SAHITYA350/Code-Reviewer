const express = require('express');
const cors = require('cors'); // Add this line
const aiRoutes = require('./routes/ai.routes');
const app = express();

// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your React app's origin
    credentials: true
}));

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello Backend');
})

app.use('/ai', aiRoutes);

module.exports = app;