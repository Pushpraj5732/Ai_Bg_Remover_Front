import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const upload = multer();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.post("/api/remove-bg", upload.single("image_file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const formData = new FormData();
    formData.append("image_file", req.file.buffer, req.file.originalname);

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVEBG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const buffer = await response.buffer();
    res.set("Content-Type", "image/png");
    res.send(buffer);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to remove background");
  }
});

app.listen(5000, () =>
  console.log("✅ Remove.bg server running on http://localhost:5000")
);
