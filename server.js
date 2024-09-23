const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// Middleware to handle JSON and cross-origin requests
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI; // Use the Mongo URI from .env

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connect to the MongoDB database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

connectToDatabase();

// Define an API endpoint to interact with MongoDB
app.get('/api/data', async (req, res) => {
    try {
        const collection = client.db("monopolyDB").collection("gameData");
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error retrieving data");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
