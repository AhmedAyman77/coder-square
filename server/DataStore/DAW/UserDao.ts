// Data Access Object for User-related database operations
import { User } from '../../types';

export interface UserDao {
    createUser(user: User): Promise<void>;
    getUserByUserName(userName: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
}