import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://pavansai:pavan1234@cluster0.t79k3sv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("keeper");

export default db;