const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'todo-backend-db';
const client = new MongoClient(url);

var db;

app.get('/', function(request, response) {  
    const toDos = db.collection("toDos");
    toDos.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        response.json(docs);
      });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

client.connect(function(err, database) {
    db = database.db(dbName);
    console.log("Connected successfully to server");
  });
