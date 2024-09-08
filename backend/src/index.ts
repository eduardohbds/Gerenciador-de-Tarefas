import express,{Request,Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/connectDB";


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all requests
app.use(morgan("dev")); // Log all requests to the console
import userRouter from "./routes/User.routes";

//const PORT = process.env.PORT;
const PORT = 3000;

app.get("/",(requests:Request,response:Response) => {
    try {
        return response.status(200).json({
            message: "Welcome to Codegenitor API",
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error",
        })
    }
});

app.use("/api/user",userRouter);

app.use((requests:Request,response:Response) => {
    return response.status(404).json({
        message: "Route not found",
    });
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
    await connectDB();
});

