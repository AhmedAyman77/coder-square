import { Post } from "./types";

//// Post API types

// create Post API types
export type createPostRequest = Pick<Post, "title" | "url" | "userId">;
export interface createPostResponse {}


// List Posts API types
export interface listPostsRequest {}
export interface listPostsResponse {
    posts: Post[];
}

// Get Post by ID API types
export interface getPostRequest {}
export interface getPostResponse {
    post: Post;
}