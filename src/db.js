const { MongoClient } = require('mongodb');
//mongo module

//specify uri of mongo db
const client = new MongoClient(process.env.MONGO_URI);

//stores a single shared database connection
let db;

async function connectDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log("MongoDB Connected");
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };

