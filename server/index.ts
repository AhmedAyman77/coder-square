import express from "express";
import { listPostsController, createPostController } from "./controllers/PostController";

const app = express();
app.use(express.json());

// endpoints
app.get("/posts", listPostsController);

app.post("/create", createPostController);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});