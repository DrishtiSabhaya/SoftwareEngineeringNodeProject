/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB.
 */
import FollowDaoI from "../interfaces/FollowDao";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow"

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns followDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to retrieve all user documents that followed a specific user from follows collection from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved
     */
    userFollowedList = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid}).populate("userFollowing").exec();

    /**
     * Uses FollowModel to retrieve all user documents that are following a specific user from follows collection from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved
     */
    userFollowingList = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid}).populate("userFollowed").exec();

    /**
     * Uses FollowModel to insert user document followed by a specific user from follows collection from the database
     * @param {string} uid User's primary key
     * @param {string} auid Another User's primary key
     * @returns Promise To be notified when the user is inserted into database
     */
    userFollows = async(uid: string, auid: string): Promise<Follow> =>
        FollowModel.create({userFollowed: auid, userFollowing: uid});

    /**
     * Removes user from the database.
     * @param {string} uid User's primary key
     * @param {string} auid Another User's primary key
     * @returns Promise To be notified when the users are removed from database
     */
    userUnFollows = async(uid: string, auid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: auid, userFollowing: uid});

}