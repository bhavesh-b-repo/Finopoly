const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware to handle JSON and cross-origin requests
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://bhaveshbadmin:6j3O1UDQ942g60ZD@monopoly.cfhrq.mongodb.net/?retryWrites=true&w=majority&appName=Monopoly";

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

// Add this endpoint in server.js
app.post('/api/save-points', async (req, res) => {
    const { points } = req.body; // Extract points from the request body
    try {
        const collection = client.db("monopolyDB").collection("gameData");
        await collection.insertOne({ points }); // Save points to the collection
        res.status(201).send("Points saved successfully");
    } catch (error) {
        res.status(500).send("Error saving points");
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
