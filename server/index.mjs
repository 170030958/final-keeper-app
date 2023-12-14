import express from "express";
import cors from "cors";
import "express-async-errors";
import todo from "./routes/todo.mjs";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Load the /posts routes
app.use("/todo", todo);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).json({ error: "Uh oh! An unexpected error occured." })
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});