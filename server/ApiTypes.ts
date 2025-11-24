import { Post, User } from "./types";

//// Post API types

// create Post API types
export type createPostRequest = Pick<Post, "title" | "url" | "userId">;
export interface createPostResponse {}


// List Posts API types
export interface listPostsRequest {}
export interface listPostsResponse {
    posts?: Post[];
    message?: string;
}

// Get Post by ID API types
export interface getPostRequest {}
export interface getPostResponse {
    post: Post;
}

// user API Types
export type signUpRequest = Pick<User, "firstName" | "lastName" | "userName" | "email" | "password">;
export interface signUpResponse {}

export interface loginRequest {
    login: string; // can be username or email
    password: string;
}
export type loginResponse = Pick<
    User, 
    "id" | "firstName" | "lastName" | "userName" | "email"
> & { message: string };
