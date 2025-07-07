import express from "express";
import cors from "cors";
import salesRoutes from "./routes/salesRoutes";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/", salesRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});