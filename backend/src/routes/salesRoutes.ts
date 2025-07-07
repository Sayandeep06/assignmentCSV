import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { parseCSV } from "../csvParser";
import { SalesSummary } from "../salesSummary";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const summaries: SalesSummary[] = [];

router.post("/upload-sales-data", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return
    }

    const { totalRecords, totalQuantity, totalRevenue } = await parseCSV(req.file.buffer);

    const summary: SalesSummary = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      totalRecords,
      totalQuantity,
      totalRevenue,
    };

    summaries.push(summary);

    res.status(200).json(summary);
  } catch (err) {
    console.error("Error processing CSV:", err);
    res.status(500).json({ message: "Failed to process CSV file." });
  }
});

router.get("/sales-summaries", (req, res) => {
  res.json(summaries);
});


router.get("/sales-summaries/:id", (req, res) => {
  const { id } = req.params;
  const summary = summaries.find((s) => s.id === id);

  if (!summary) {
    res.status(404).json({ message: "Summary not found." });
    return;
  }

  res.json(summary);
});

export default router;