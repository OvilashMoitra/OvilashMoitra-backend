const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.post('/contactPosting', async (req, res) => {
            const newContact = req.body;
            const result = await contactCollection.insertOne(newContact);
            console.log(reviewCollection);
            res.send(result);
        })
        app.get('/contact', async (req, res) => {
            const query = {}
            const cursor = contactCollection.find(query);
            const contact = await cursor.toArray();
            res.send(contact);
        })
        app.put("/contactMark", async (req, res) => {
            const id = req.query.id;
            console.log(id)
            console.log(req.body);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    isMark: req.body.isMark
                },
            };
            const result = await contactCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.delete("/deleteContact", async (req, res) => {
            const id = req.query.id
            const query = { _id: ObjectId(id) };
            const result = await contactCollection.deleteOne(query);
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