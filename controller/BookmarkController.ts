/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks to fetch all the tuits bookmarked by a user
 *     </li>
 *     <li>POST /users/:uid/bookmarks/:tid to post that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /users/:uid/bookmarks/:tid to delete a bookamarked tuit for a particular user
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            /**
             * Retrieve all bookmarked tuits by user
             */
            app.get("/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            /**
             * Post a new bookmarked tuit from a user
             */
            app.post("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            /**
             * Delete a bookmarked tuit from a specific user's list
             */
            app.delete("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Get all bookmarked tuits by user
     * @param req req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param res res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Post a bookmarked tuits by user
     * @param req req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param res res Represents response to client, including the
     * body formatted as JSON containing the tuit object that was bookmarked
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Delete a specific bookmarked tuit by user
     * @param req req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param res res Represents response to client, including the
     * body formatted with delete status for bookmarked tuit
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
};