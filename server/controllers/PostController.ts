import { RequestHandler } from "express"; // let me use req and res with types
import { inMemoryDB } from "../DataStore/index";
import { randomUUID } from "crypto";
import { Post } from "../types";

// custom generic handler helps me use req.body with types(if i did not use it it will be any and no types will appear in auto complete)
export type ExpressHandler<req, res> = RequestHandler<
    string,
    Partial<res>,
    Partial<req>,
    any
>

// the {} means i do not care about req body or res body types here
export const listPostsController: ExpressHandler<{}, {}> = (req, res) => {
    res.send({ posts: inMemoryDB.listPosts() });
};

type createPostRequest = Pick<Post, "title" | "url" | "userId">;
interface createPostResponse {}

export const createPostController: ExpressHandler<createPostRequest, createPostResponse> = (req, res) => {
    if(!req.body.title || !req.body.url || !req.body.userId) {
        return res.status(400).send({ message: "Missing required fields" });
    }

    const newPost: Post = {
        id: randomUUID(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId,
        postedAt: Date.now(),
    };

    inMemoryDB.createPost(newPost);
    res.status(201).send({ message: "Post created successfully", post: newPost });
};