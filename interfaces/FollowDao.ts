import Follow from "../models/Follow";

/**
 * @file Declares API for follows related data access object methods
 */
export default interface FollowDao {
    userFollows(uid: string, auid: string): Promise<Follow>;
    userUnFollows(uid: string, auid: string): Promise<Follow>;
    userFollowingList(uid: string): Promise<Follow[]>;
    userFollowedList(uid: string): Promise<Follow[]>;
}