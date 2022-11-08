const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xplf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const projectsCollection = client.db("portfolio").collection("projects");
        const contactCollection = client.db("portfolio").collection("contact");
        const reviewCollection = client.db("portfolio").collection("reviews");
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = projectsCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        })
        app.post('/contact', async (req, res) => {
            const newContact = req.body;
            const result = await contactCollection.insertOne(newContact);
            console.log(reviewCollection);
            res.send(result);
        })
        app.get('/contact', async (req, res) => {
            const newContact = req.body;
            const result = await contactCollection.insertOne(newContact);
            console.log(result);
            res.send(result);
        })
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my node CRUD server')
})

app.listen(port, () => {
    console.log('crud server is running ');
})