// const express = require('express');
// const cors = require('cors'); // Add this line
// const aiRoutes = require('./routes/ai.routes');
// const app = express();

// // Add CORS middleware
// app.use(cors({
//     origin: 'http://localhost:5173', // Your React app's origin
//     credentials: true
// }));

// app.use(express.json());

// app.get('/', (req,res) => {
//     res.send('Hello Backend');
// })

// app.use('/ai', aiRoutes);

// module.exports = app;




const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://code-reviewer-mauve-xi.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Error: Not allowed - ' + origin));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Backend');
});

app.use('/ai', aiRoutes);

module.exports = app;
