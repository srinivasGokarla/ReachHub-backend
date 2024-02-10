const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  authRoutes = require('./src/routes/userRoutes');
const  chessRoutes = require('./src/routes/chessRoutes');


const app = express();
const port = process.env.PORT || 5890;

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/',chessRoutes)


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

mongoose.connect("mongodb+srv://Srinivas:Srinivas@cluster0.eu5eekh.mongodb.net/brandWick?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
