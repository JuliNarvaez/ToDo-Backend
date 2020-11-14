const express = require('express');
const cors = require('cors');
const { runInNewContext } = require('vm');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'todo-backend-db';
const client = new MongoClient(url);

var db;

app.use(express.json());
app.use(express.urlencoded());

app.use(cors("*"))

app.get('/', function(request, response) {  
    const toDos = db.collection("toDos");
    toDos.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        response.json(docs);
      });
});

app.post('/', function(req, res){
    const toDos = db.collection("toDos");
    toDos.insertOne(req.body, function(err, resdb){
        console.log(`Se insertó ${req.body}`)
        res.json("Postear");
    });
});

app.put('/', function(req, res){
    let query = {
        id: req.body.id 
    }
    var newvalues = { $set: req.body };
    db.collection("toDos").updateOne(query, newvalues, function (err, resdb){
        console.log(`Se cambió ${query} por ${newvalues}`);
        res.json("Putear");
    })
    console.log(req.body);
});

app.delete('/', function(req, res){
    let query = {
        id: req.body.id 
    }
    db.collection("toDos").deleteOne(query, function (err, resdb){
        console.log(`Se Borró ${query}`);
        res.json("Deletear");
    })
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

client.connect(function(err, database) {
    db = database.db(dbName);
    console.log("Connected successfully to server");
  });
