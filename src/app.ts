import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mainRoutes from "./routes/index"
import { errorHandler } from "./middlewares/errorHandler";
import { SeedData } from "./modules/students/seedStudents";

const app = express();

app.use(cors());
app.use(json());

app.use('/api/test',(req,res)=>{
    res.send("API running")
})
SeedData();
app.use('/api', mainRoutes);

app.use(errorHandler);

export default app;