import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//default route
app.get("/", (req, res) => {
  try {
    res.send("Backend is running....YAY");
  } catch (err) {
    console.log("OH NO .... ERROR")
  }
  return true;
});

// MongoDB Connection

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
