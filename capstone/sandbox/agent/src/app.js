import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const WORKSPACE_DIR = "/workspace";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the Sandbox Agent API!",
    status: "Success",
  });
});

/**
 * @route GET /list-files
 * @description Lists all files in the working directory and its subdirectories. Returns a JSON object with the file paths relative to the working directory. exclude directories like node_modules, .git,dist, etc.
 * - eg. {
 *     "files": [
 *         "file1.txt",
 *         "src/file2.txt",
 *         "src/subdir/file3.txt"
 *     ]
 * }
 */
app.get("/list-files", async (req, res) => {
  const listFiles = async (dir, baseDir) => {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      // Exclude certain directories
      if (
        entry.isDirectory() &&
        ["node_modules", ".git", "dist"].includes(entry.name)
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        files.push(...(await listFiles(fullPath, baseDir)));
      } else {
        files.push(relativePath);
      }
    }

    return files;
  };

  try {
    const files = await listFiles(WORKSPACE_DIR, WORKSPACE_DIR);
    res.status(200).json({
      message: "Files listed successfully",
      files,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error listing files: ${err.message}`,
      status: "error",
    });
  }
});

/**
 * @route GET /read/files
 * @description Read the content of all files requested in the query parameters 'files'. and return their content as a JSON object.
 * eg: /read/files?files=file1.txt, file2.txt
 */

app.get("/read/files", async (req, res) => {
  const files = req.query.files;

  if (!files) {
    return res.status(400).json({
      message: "No files specified in query parameters",
      status: "error",
    });
  }

  const fileList = files.split(",");

  const results = await Promise.all(
    fileList.map(async (file) => {
      const filePath = path.join(WORKSPACE_DIR, file);
      try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        return {
          [filePath.replace(WORKSPACE_DIR, "")]: content,
        };
      } catch (err) {
        return {
          [filePath.replace(WORKSPACE_DIR, "")]:
            `Error reading file: ${err.message}`,
        };
      }
    }),
  );

  res.status(200).json({
    message: "File contents retrieved successfully",
    files: results,
  });
});

/**
 * @route PATCH /update/files
 * @description Update the content of files specified in the request body. The request body should contained a property "updates" with a JSON Array of objects, each object should have file property specifying the file path relative to the workspace directory and content property specifying the new content for the file.
 * eg: {
 *   "file1.txt": "New content for file1",
 * }
 */
app.patch("/update/files", async (req, res) => {
  const updates = req.body.updates;

  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({
      message:
        "Invalid request body. Expected a JSON objects with an 'updates' property.",
      status: "error",
    });
  }

  const results = await Promise.all(
    updates.map(async (update) => {
      const { file, content } = update;
      const filePath = path.join(WORKSPACE_DIR, file);

      try {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, content, "utf-8");
        return {
          [filePath.replace(WORKSPACE_DIR, "")]: "File updated successfully",
        };
      } catch (err) {
        return {
          [filePath.replace(WORKSPACE_DIR, "")]: `Error updating file: ${err.message}`,
        };
      }
    }),
  );

  res.status(200).json({
    message: "File updates results",
    results,
  });
});

/**
 * @route POST /create-files
 * @description Create new files with the content specified in the request body. The request body should contain a property "files" with a JSON array of objects, each object should have a "file" property specifying the file path relative to the workspace directory and a "content" property specifying the content for the new file.
 */

app.post("/create-files", async (req, res) => {
  const files = req.body.files;

  if (!files || !Array.isArray(files)) {
    return res.status(400).json({
      message:
        "Invalid request body. Expected a JSON object with a 'files' property.",
      status: "error",
    });
  }

  const results = await Promise.all(
    files.map(async (fileObj) => {
      const { file, content } = fileObj;
      const filePath = path.join(WORKSPACE_DIR, file);

      try {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile (filePath, content, "utf-8");
        return {
          [filePath]: "File created successfully",
        };
      } catch (err) {
        return {
          [filePath]: `Error creating file: ${err.message}`,
        };
      }
    }),
  );

  res.status(200).json({
    message: "Files created successfully",
    results,
  });
});

export default app;
