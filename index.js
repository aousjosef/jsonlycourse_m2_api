import express from "express";
import bodyParser from "body-parser";
import courseRoutes from "./routes/courses.js";

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use('/courses', courseRoutes);

app.get("/", (req, res) => {

  res.send("Hello from main");
  
});

app.listen(PORT, () =>
  console.log(`Runing on localhost port:  http://localhost:${PORT}/courses`)
);
