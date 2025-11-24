import { Like } from '../../types';

export interface LikeDao {
    likePost(like: Like): Promise<void>;
}