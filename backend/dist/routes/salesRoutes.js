"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const csvParser_1 = require("../csvParser");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const summaries = [];
router.post("/upload-sales-data", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded." });
            return;
        }
        const { totalRecords, totalQuantity, totalRevenue } = yield (0, csvParser_1.parseCSV)(req.file.buffer);
        const summary = {
            id: (0, uuid_1.v4)(),
            timestamp: new Date().toISOString(),
            totalRecords,
            totalQuantity,
            totalRevenue,
        };
        summaries.push(summary);
        res.status(200).json(summary);
    }
    catch (err) {
        console.error("Error processing CSV:", err);
        res.status(500).json({ message: "Failed to process CSV file." });
    }
}));
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
exports.default = router;
