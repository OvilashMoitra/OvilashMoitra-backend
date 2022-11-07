const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ka6uaca.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        // await client.connect();
        const projectsCollection = client.db("Portfolio").collection("projects");
        const contactCollection = client.db("Portfolio").collection("contact");
        // const reviewCollection = client.db("portfolio").collection("reviews");
        app.get('/projects', async (req, res) => {
            const query = {}
            const projects = projectsCollection.find(query).toArray();
            res.send(projects);
        })
        app.post('/contact', async (req, res) => {
            const newContact = req.body;
            const result = await contactCollection.insertOne(newContact);
            console.log(reviewCollection);
            res.send(result);
        })
        app.get('/contact', async (req, res) => {
            // const newContact = req.body;
            // const result = await contactCollection.insertOne(newContact);
            // console.log(reviewCollection);
            res.send("working well");
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