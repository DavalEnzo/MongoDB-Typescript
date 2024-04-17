import mongoose from "mongoose";
import express, {Express} from "express";
import livreRoutes from "./routes/livreRoutes";
import auteurRoutes from "./routes/auteurRoutes";

mongoose.connect('mongodb+srv://davalenzo:UxXqNJRFWQBW4vBH@mern.baujaue.mongodb.net/MERN?retryWrites=true&w=majority&appName=MERN'
).then(() =>
  console.log('MongoDB Connected')
)

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use('/api/livres', livreRoutes);
app.use('/api/auteurs', auteurRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


