import { CommentDao } from "./CommentDao";
import { PostDao } from "./PostDao";
import { UserDao } from "./UserDao";
import { LikeDao } from "./LikeDao";
import { InMemoryDataStore } from "./MemoryDB/index";

export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export const inMemoryDB = new InMemoryDataStore();