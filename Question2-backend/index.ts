import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import categoryRouter from "./routes/categories";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/categories", categoryRouter);

app.get("/", (req, res) => {
  res.send("Root Page");
});

app.listen(3000, () => {
  console.log(`Server listening port 3000`);
});
