import express from "express";
import fs from "fs/promises";

const router = express.Router();
const filePath = "./courses.json";

let jsonData;

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

// Add new course to data
function addNewCourse(id, courseId, courseName, coursePeriod) {
  if (!id || !courseId || !courseName || !coursePeriod) {
    return console.log("ERROR: Something is empty");
  }

  const newObj = {
    _id: id,
    courseId: courseId,
    courseName: courseName,
    coursePeriod: coursePeriod,
  };

  jsonData.push(newObj);
}

// All routes start from /courses route
router.get("/", async (req, res) => {
  await readFile();
  res.send(jsonData);
});

router.post("/", async (req, res) => {
  await readFile();
  addNewCourse(225, "DT543", "Aous 22", 23);
  await writeFile(jsonData);
  res.send(jsonData);
});

console.log("hello from routerCourse");

export default router;
