import { inMemoryDB } from "../DataStore/index";
import { randomUUID } from "crypto";
import { Post, ExpressHandler } from "../types";
import { createPostRequest, createPostResponse, listPostsRequest, listPostsResponse } from "../ApiTypes";


// the {} means i do not care about req body or res body types here
export const listPostsController: ExpressHandler<listPostsRequest, listPostsResponse> = (req, res) => {
    res.send({ posts: inMemoryDB.listPosts() });
};


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