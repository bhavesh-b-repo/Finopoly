const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://bhaveshbadmin:6j3O1UDQ942g60ZD@monopoly.cfhrq.mongodb.net/?retryWrites=true&w=majority&appName=Monopoly";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
