// Data Access Object for User-related database operations
import { User } from '../types';

export interface UserDao {
    createUser(user: User): void;
    getUserByUserName(userName: string): User | undefined;
    getUserByEmail(email: string): User | undefined;
}