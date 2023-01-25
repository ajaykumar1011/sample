import * as express from "express";
import { Application } from "express";
import * as logger from "morgan";
import * as cors from "cors";
import * as apiRoutes from "./api";
import { dropUser } from "./db";
const app: Application = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes endpoint configuration
app.use(`/api`, apiRoutes);
// Creating admin
dropUser();

// Server configuration
const PORT = process.env.PORT as string;
app.listen(PORT, () => {
  console.log(`Server Listening on port: ${PORT}`);
});
