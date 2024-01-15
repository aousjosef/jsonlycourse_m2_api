import express from "express";
import bodyParser from "body-parser";
import courseRoutes from "./routes/courses.js";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/courses', courseRoutes);

app.get("/", (req, res) => {

  res.send("Hello from main");
  
});

app.listen(PORT, () =>
  console.log(`Runing on localhost port:  http://localhost:${PORT}/courses`)
);
