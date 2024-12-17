import connectToMongo from './db.js';  // Ensure this uses import syntax
import express from 'express';  // Use import for express
import authRoutes from './routes/auth.js';  // Use import for routes
import notesRoutes from './routes/notes.js'

connectToMongo();

const app = express();
const port = 3001;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);   // Use the imported authRoutes

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
