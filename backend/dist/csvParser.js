"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSV = parseCSV;
const stream_1 = require("stream");
const csv_parser_1 = __importDefault(require("csv-parser"));
function parseCSV(fileBuffer) {
    return new Promise((resolve, reject) => {
        const total = {
            totalRecords: 0,
            totalQuantity: 0,
            totalRevenue: 0,
        };
        stream_1.Readable.from(fileBuffer)
            .pipe((0, csv_parser_1.default)())
            .on("data", (row) => {
            const quantity = parseInt(row.quantity);
            const price = parseFloat(row.price_per_unit);
            if (!isNaN(quantity) && !isNaN(price)) {
                total.totalRecords += 1;
                total.totalQuantity += quantity;
                total.totalRevenue += quantity * price;
            }
        })
            .on("end", () => resolve(total))
            .on("error", reject);
    });
}
