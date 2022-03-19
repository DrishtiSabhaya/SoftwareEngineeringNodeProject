/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import TuitModel from "../mongoose/TuitModel";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns tuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Removes tuit from the database.
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection from the database
     * @returns Promise To be notified when the tuits are retrieved
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    /**
     * Uses TuitModel to retrieve all user documents from tuits collection from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved
     */
    async findTuitsByUser(uid: string): Promise<any> {
        return await TuitModel.find({postedBy: uid});
    }

    /**
     * Updates tuit with new values in database
     * @param {string} tid Tuit's primary key
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

}