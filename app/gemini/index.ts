import express from "express";
import { apiRouter } from "./router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
