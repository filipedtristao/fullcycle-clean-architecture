import Notification from "../notifications/notification";

export default abstract class Entity {
    constructor(
        protected notification = new Notification(),
    ) { }
}