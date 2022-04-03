import DislikeDaoI from "../interfaces/DislikeDao";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns dislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    /**
     * Uses DislikeModel to retrieve all user documents that disliked a specific tuit from dislikes collection from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Uses DislikeModel to retrieve all tuit documents that are disliked a specific user from dislikes collection from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Uses Dislike Model to retrieve whether the user disliked the tuit or not.
     * @param uid User's primary key
     * @param tid Tuit's primary key
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Removes tuit from the database.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the tuits are removed from database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to count the number of disliked tuit from the database.
     * @param tid Tuit's primary key
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}