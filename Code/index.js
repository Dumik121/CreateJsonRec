const fs = require("fs/promises");
const path = require("path");

Recursion("./test");

async function Recursion(directoryPath) {
  await CreateJson(directoryPath);
  const files = await fs.readdir(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    if (await isDirectory(filePath)) {
      await Recursion(filePath);
    }
  }
}

async function CreateJson(directoryPath) {
  const PathFile = path.join(directoryPath, "info.json");
  console.log(PathFile)
  const FilesNum = await CountFiles(directoryPath);
  const FolderNum = await CountFolders(directoryPath);
  const JsonInfo = {
    PathFile,
    FilesNum,
    FolderNum,
  };

  try {
    await fs.writeFile(PathFile, JSON.stringify(JsonInfo));
  } catch (err) {
    console.error("Error creating info.json:", err);
  }
}

async function CountFiles(directoryPath) {
  const files = await fs.readdir(directoryPath);
  let sum = 0;
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    if (!(await isDirectory(filePath))) {
      sum++;
    }
  }

  return sum;
}

async function CountFolders(directoryPath) {
  const files = await fs.readdir(directoryPath);
  let sum = 0;

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    if (await isDirectory(filePath)) {
      sum++;
    }
  }

  return sum;
}

async function isDirectory(directoryPath) {
  const stats = await fs.stat(directoryPath);

  return stats.isDirectory();
}

