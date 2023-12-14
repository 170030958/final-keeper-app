import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://sonuandra:Harshaandra1205@cluster0.kdf8zr3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("keeper");

export default db;