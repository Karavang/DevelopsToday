import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes';

const app = express();
const PORT = 4444;

app.use(cors());
app.use(express.json());

app.use('/', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
