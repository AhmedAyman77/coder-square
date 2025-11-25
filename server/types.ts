import { RequestHandler } from "express"; // let me use req and res with types

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface Post {
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: number;
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    Comment: string;
    postedAt: number;
}

export interface Like {
    userId: string;
    postId: string;
}

type WithError<T> = T & { message: string };

// custom(generic) handler helps me use req.body with types(if i did not use it it will be any and no types will appear in auto complete)
export type ExpressHandler<req, res> = RequestHandler<
    string,
    Partial<WithError<res>>,
    Partial<req>,
    any
>