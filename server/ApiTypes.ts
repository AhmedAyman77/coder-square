import { Post, User } from "./types";

//// Post API types

// create Post API types
export type createPostRequest = Pick<Post, "title" | "url">;
export interface createPostResponse {
    post: Post;
}


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

// user API Types
export type signUpRequest = Pick<
    User,
    'email' | 'firstName' | 'lastName' | 'userName' | 'password'
>;
export interface signUpResponse {
    jwt: string;
}

export interface loginRequest {
    login: string; // userName or email
    password: string;
}
export type loginResponse = {
    user: Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>;
    jwt: string;
};

export interface JWTObject {
    userId: string;
}