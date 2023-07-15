import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis } from "./data/data.js";
// Configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(cors());

// Routes
app.use('/kpi', kpiRoutes);

/* Mongoose setup */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`server connected at Port: ${PORT}`));
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async () => {
        console.log('Database connected');
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error) => console.log(`${error}, did not connect`));