// import { inMemoryDB } from "../DataStore/index";
import { db } from "../DataStore";
import { randomUUID } from "crypto";
import { Post, ExpressHandler } from "../types";
import { createPostRequest, createPostResponse, listPostsRequest, listPostsResponse } from "../ApiTypes";


// the {} means i do not care about req body or res body types here
export const listPostsController: ExpressHandler<listPostsRequest, listPostsResponse> = async (req, res) => {
    try {
        res.send({ posts: await db.listPosts() });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
};

export const createPostController: ExpressHandler<createPostRequest, createPostResponse> = async (req, res) => {
    try {
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

    await db.createPost(newPost);
    res.status(201).send({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
};