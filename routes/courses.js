import express, { json } from "express";
import fs from "fs/promises";

const router = express.Router();
const filePath = "./courses.json";

let jsonData = [];

// Read file
async function readFile() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    jsonData = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

// Write to file
async function writeFile(data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, "utf8");
    console.log("File updated successfully!");
  } catch (err) {
    console.error(err);
  }
}

// * * ** * * *ROUTES * * * * *

// GET ALL ROUTE
router.get("/", async (req, res) => {
  await readFile();
  res.send(jsonData);
});

// POST ROUTE
router.post("/", async (req, res) => {
  await readFile();
  const userInput = req.body;
  jsonData.push(userInput);
  await writeFile(jsonData);
  console.log(typeof jsonData);
  res.send(jsonData);
});

//GET BY ID ROUTE
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await readFile();
  const getCourseById = jsonData.find((course) => {
    return course._id == id;
  });
  if (!getCourseById) {
    res.status(404).send("Course not found");
  } else {
    res.send(getCourseById);
  }
});

router.delete("/:id", async (req, res) => {
  const idToDelete = parseInt(req.params.id);
  await readFile();

  // Find the index of the course with the specified _id
  const indexToDelete = jsonData.findIndex(
    (course) => course._id === idToDelete
  );

  if (indexToDelete === -1) {
    res.status(404).send("Course not found");
  } else {
    // Remove the course from the array
    jsonData.splice(indexToDelete, 1);

    // Write the updated data back to the file
    await writeFile(jsonData);

    res.send({
      message: "Course deleted successfully",
      deletedCourseId: idToDelete,
    });
  }
});

export default router;
