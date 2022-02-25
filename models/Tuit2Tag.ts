import Tag from "./Tag";
import Tuit from "./Tuit";

/**
 * @typedef Tuit2Tag Represents a tuit to tag relationship
 * @property {Tag} tag tag name
 * @property {Tuit} tuit tuit name
 */
export default class Tuit2Tag {
    private tag: Tag | null = null;
    private tuit: Tuit | null = null;
}