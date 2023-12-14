import express from "express";
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb";

const router = express.Router();

const todoCollection = db.collection("todo_data")

router.get("/fetch_todo", async (req, res) => {
  let results = await todoCollection.find({})
    .toArray();

  res.send(results).status(200);
});

router.post("/save_todo", async (req, res) => {
  const { title, body } = req.body;
  console.log({ title, body })
  try {
    const result = await todoCollection.insertOne({ title, body });
    
    console.log('Todo saved:', result.ops[0]);
    res.send(result).status(204);
  } catch (err) {
    console.error('Error saving todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.delete("/delete_todo/:id", async (req, res) => {
  var id = req.params.id;

  try {
    const result = await todoCollection.deleteOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ error: 'Item not found', code: 404 });
    }
    console.log("Deletion:", result);
    res.json({ success: "Item deleted successfully" });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

export default router;