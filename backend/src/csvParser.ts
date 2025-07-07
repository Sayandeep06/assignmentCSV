import { Readable } from "stream";
import csv from "csv-parser";

export function parseCSV(fileBuffer: Buffer): Promise<{
  totalRecords: number;
  totalQuantity: number;
  totalRevenue: number;
}> {
  return new Promise((resolve, reject) => {
    const total = {
      totalRecords: 0,
      totalQuantity: 0,
      totalRevenue: 0,
    };

    Readable.from(fileBuffer)
      .pipe(csv())
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