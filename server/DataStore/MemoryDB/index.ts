import { DataStore } from "../index";
import { User, Post, Comment, Like } from "../../types";


export class InMemoryDataStore implements DataStore {
    // in memory objects
    private users: User[] = [];
    private posts: Post[] = [];
    private comments: Comment[] = [];
    private likes: Like[] = [];
    createUser(user: User): Promise<void> {
        this.users.push(user)
        return Promise.resolve();
    }
    getUserById(id: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));
    }
    getUserByUserName(userName: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.userName === userName));
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.email === email));
    }
    listPosts(): Promise<Post[]>     {
        return Promise.resolve(this.posts);
    }
    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }
    getPostById(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(post => post.id === id));
    }
    deletePost(id: string): Promise<void> {
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
        }
        return Promise.resolve();
    }
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(comment => comment.postId === postId));
    }
    deleteComment(id: string): Promise<void> {
        const index = this.comments.findIndex(comment => comment.id === id);
        if (index !== -1) {
            return Promise.resolve();
        }
        this.comments.splice(index, 1);
        return Promise.resolve();
    }
    
    likePost(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
}