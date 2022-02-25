/**
 * @file Controller RESTful Web service API for follow resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

/**
 * @class FollowsController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/followedlist to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /users/:uid/followinglist to retrieve all the users following a user
 *     </li>
 *     <li>POST /users/:uid/users/:auid to record that a user is following a user
 *     </li>
 *     <li>DELETE /users/:uid/users/:auid to delete following of one user with another
 *     no longer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            /**
             * Post that a user is following a user
             */
            app.post("/users/:uid/users/:auid", FollowController.followController.userFollows);
            /**
             * Deleting the following of one user with another
             */
            app.delete("/users/:uid/users/:auid", FollowController.followController.userUnFollows);
            /**
             * Get all the users following a user
             */
            app.get("/users/:uid/followinglist", FollowController.followController.userFollowingList);
            /**
             * Get all the users followed by a user
             */
            app.get("/users/:uid/followedlist", FollowController.followController.userFollowedList);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Post that a user is following a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing one user and auid representing another user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user objects
     */
    userFollows = (req: Request, res: Response) =>
        FollowController.followDao.userFollows(req.params.uid, req.params.auid)
            .then(follows => res.json(follows));

    /**
     * Deleting the following of one user with another
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing one user and auid representing another user
     * @param res res Represents response to client, including the
     * body formatted with delete status for unfollowed user
     */
    userUnFollows = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollows(req.params.uid, req.params.auid)
            .then(follows => res.json(follows));

    /**
     * Get all the users following a user
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the users following
     */
    userFollowingList = (req: Request, res: Response) =>
        FollowController.followDao.userFollowingList(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Get all the users followed by a user
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the users followed
     */
    userFollowedList = (req: Request, res: Response) =>
        FollowController.followDao.userFollowedList(req.params.uid)
            .then(follows => res.send(follows));
};