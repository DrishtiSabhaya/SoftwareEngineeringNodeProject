import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollows (req: Request, res: Response): void;
    userUnFollows (req: Request, res: Response): void;
    userFollowingList (req: Request, res: Response): void;
    userFollowedList (req: Request, res: Response): void;
};