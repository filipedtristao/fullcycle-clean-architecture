import Notification from "../notifications/notification";

export default abstract class Entity {
    constructor(
        public notification = new Notification(),
    ) { }
}