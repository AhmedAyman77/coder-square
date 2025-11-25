import { open as SQLopen, Database} from "sqlite";
import sqlite3 from "sqlite3";
import { DataStore } from "..";
import { User, Post, Comment, Like } from "../../types";
import path from "path";

export class SQLDataStore implements DataStore {
    // db! the exclamation mark tells typescript that i will initialize this later
    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    public async openDB() {
        this.db = await SQLopen({
            filename: path.join(__dirname, "coderSquare.sqlite"),
            driver: sqlite3.Database
        });
        
        this.db.run("PRAGMA foreign_keys = ON");
        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations'),
        });
        
        return this;
    }
    async createUser(user: User): Promise<void> {
        await this.db.run(
        'INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?,?,?,?,?,?)',
        user.id,
        user.email,
        user.password,
        user.firstName,
        user.lastName,
        user.userName
        );
    }
    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
    }

    getUserByUserName(userName: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE userName = ?`, userName);
    }

    listPosts(): Promise<Post[]> {
        // <Post[]> is a type assertion to tell typescript what type to expect
        return this.db.all<Post[]>("SELECT * FROM posts");
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run(
            `INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?, ?, ?, ?, ?)`,
            post.id,
            post.title,
            post.url,
            post.userId,
            post.postedAt
        );
        return Promise.resolve();
    }
    getPostById(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    likePost(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }

}