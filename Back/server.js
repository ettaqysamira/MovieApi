import express from "express"
import mongoose from "mongoose"
import cors from "cors"


const MONGO_URI = "mongodb+srv://samiraettaqy:samiraMongoose@cluster0.njz9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch(err => console.log("Erreur MongoDB :", err))

const PORT = 5000
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`))


