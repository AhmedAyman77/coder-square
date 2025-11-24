import { CommentDao } from "./DAW/CommentDao";
import { LikeDao } from "./DAW/LikeDao";
import { PostDao } from "./DAW/PostDao";
import { UserDao } from "./DAW/UserDao";
// import { InMemoryDataStore } from "./MemoryDB/index";
import { SQLDataStore } from "./SQL";

export interface DataStore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: DataStore;

export async function initializeDataStore() {
    db = await new SQLDataStore().openDB();
}