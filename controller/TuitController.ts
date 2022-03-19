/**
 * @file Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /tuits creates a new tuit by a user
 *     </li>
 *     <li>GET /tuits to retrieve all the tuit
 *     </li>
 *     <li>GET /tuits/:tid to retrieve a particular tuit
 *     </li>
 *     <li>GET /users/:uid/tuits to retrieve tuits for a given user
 *     </li>
 *     <li>PUT /tuits/:tid to modify an individual tuit
 *     </li>
 *     <li>DELETE /tuits/:tuitid to delete a specific tuit
 *     </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI {

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.get('/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post("/users/:uid/tuits", TuitController.tuitController.createTuit);
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    /**
     * Post a new tuit by a specific user
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit object
     */
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.params.uid, req.body)
            .then((tuit: Tuit) => res.json(tuit));

    /**
     * Deleting a specific tuit
     * @param {Request} req Represents request from client, including path
     * parameter tid representing tuit to be removed
     * @param {Response} res Represents response to client, including including the
     * body formatted with delete status for the tuit
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));

    /**
     * Get all tuits
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * Find a particular tuit by id
     * @param {Request} req Represents request from client, including path
     * parameter tid representing a tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit object
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    /**
     * Get all tuits for a particular user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuit => res.json(tuit));

    /**
     * Updating a specific tuit
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user and JSON object for the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted with update status for the tuit
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

}