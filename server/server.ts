import express from "express";
import { listPostsController, createPostController } from "./controllers/PostController";
import { initializeDataStore } from "./DataStore";
import { requestLoggerMiddleware } from "./middleware/loggerMiddleware";
import { errorHandler } from "./middleware/errorHandlerMiddleware";
import dotenv from "dotenv";
import { loginController, signUpController } from "./controllers/userController";
import { authMiddleware } from "./middleware/authMiddleware";

(async () => {
    await initializeDataStore();

    dotenv.config();
    
    const app = express();
    app.use(express.json());

    app.use(requestLoggerMiddleware);
    
    // public endpoints
    app.post("/signup", signUpController);
    app.post("/login", loginController);

    app.use(authMiddleware)

    // protected endpoints
    app.get("/posts", listPostsController);
    app.post("/create", createPostController);

    app.use(errorHandler);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})()