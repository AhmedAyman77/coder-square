import express, { ErrorRequestHandler } from "express";
import { listPostsController, createPostController } from "./controllers/PostController";

const app = express();
app.use(express.json());

// error handling middleware
const errorHandler: ErrorRequestHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
}

// endpoints
app.get("/posts", listPostsController);

app.post("/create", createPostController);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});