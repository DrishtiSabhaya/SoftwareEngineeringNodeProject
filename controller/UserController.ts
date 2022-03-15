/**
 * @file Controller RESTful Web service API for users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users to create a new user
 *     </li>
 *     <li>GET /users to retrieve all the user
 *     </li>
 *     <li>GET /users/:userid to retrieve a specific user
 *     </li>
 *     <li>PUT /users/:userid to modify a specific user
 *     </li>
 *     <li>DELETE /users/:userid to remove a particular user
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {

    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns UserController
     */
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/users', UserController.userController.findAllUsers);
            app.get('/users/:userid', UserController.userController.findUserById);
            app.post('/users', UserController.userController.createUser);
            app.delete('/users/:userid', UserController.userController.deleteUser);
            app.put('/users/:userid', UserController.userController.updateUser);
            app.delete("/users",
                UserController.userController.deleteAllUsers);

            app.post("/login",
                UserController.userController.login);

            // for testing. Not RESTful
            app.get("/users/create",
                UserController.userController.createUser);
            app.get("/users/id/:uid/delete",
                UserController.userController.deleteUser);
            app.get("/users/username/:username/delete",
                UserController.userController.deleteUsersByUsername);
            app.get("/users/delete",
                UserController.userController.deleteAllUsers);
        }
        return UserController.userController;
    }

    /**
     * Get all users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
     * Get a specific user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    /**
     * Post a new user
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user object
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
     * Deletes a specific user
     * @param {Request} req Represents request from client, including path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted with delete status for the user
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));

    /**
     * Removes all user instances from the database. Useful for testing
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));

    /**
     * Updating a specific user
     * @param {Request} req Represents request from client, including path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted with update status for the user
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));

    deleteUsersByUsername = (req: Request, res: Response) =>
        UserController.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.send(status));

    login = (req: Request, res: Response) =>
        UserController.userDao
            .findUserByCredentials(req.body.username, req.body.password)
            .then(user => {
                res.json(user)
            });

    register = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.body.username)
            .then(user => {

            })
}
