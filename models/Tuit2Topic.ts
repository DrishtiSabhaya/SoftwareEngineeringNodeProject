/**
 * @file Declares Tuit2Topic data type representing an account
 * on the platform
 */
import Tag from "./Tag";
import Topic from "./Topic";

/**
 * @typedef Tuit2Topic Represents a tuit to topic relationship
 * @property {Tag} tag tag name
 * @property {Topic} topic topic name
 */
export default class Tuit2Topic {
    private tag: Tag | null = null;
    private topic: Topic | null = null;
}