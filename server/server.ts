import dotenv from "dotenv";
import express from "express";
import { createPostController, listPostsController } from "./controllers/PostController";
import { loginController, signUpController } from "./controllers/userController";
import { initializeDataStore } from "./DataStore";
import { authMiddleware } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorHandlerMiddleware";
import { requestLoggerMiddleware } from "./middleware/loggerMiddleware";

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

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})()