import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const MONGO_URI = "mongodb+srv://samiraettaqy:samiraMongoose@cluster0.njz9h.mongodb.net/moviesDB?retryWrites=true&w=majority&appName=Cluster0";

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 5000



mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch(err => console.log("Erreur MongoDB :", err))


const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true }
})
const Movie = mongoose.model('Movie', MovieSchema)


app.post('/api/movies', async (req, res) => {
    try {
        const { title, imageUrl, description } = req.body
        
        const newMovie = new Movie({ title, imageUrl, description })
        await newMovie.save()
        res.json({ message: 'Movie added', movie: newMovie })
    } catch (error) {
        res.json({ error: 'Error' })
    }
})

//pour récuperer les infos à partir de la BDD
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch (error) {
        res.status(500).json({ error: 'Error' })
    }
})




app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`))


