import connectToMongo from './db.js';  // Ensure this uses import syntax
import express from 'express';  // Use import for express
import authRoutes from './routes/auth.js';  // Use import for routes

connectToMongo();

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Use the imported authRoutes

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
