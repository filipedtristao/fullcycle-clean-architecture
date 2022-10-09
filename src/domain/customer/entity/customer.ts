import Entity from "../../@shared/entities/entity";
import NotificationError from "../../@shared/notifications/notification.error";
import CustomerValidatorFactory from "../factories/customer-validator.factory";
import Address from "./address";

export default class Customer extends Entity {
    private address!: Address;
    private active: boolean = true;
    private rewardPoints: number = 0;

    constructor(
        private id: string,
        private name: string,
    ) {
        super();

        this.validate()

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    changeName(name: string) {
        this.name = name;
    }

    changeAddress(address: Address) {
        this.address = address;
    }

    isActive() {
        return this.active;
    }

    activate() {
        if (!this.address) {
            throw new Error('Address is required');
        }

        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    addRewardPoints(points: number) {
        this.rewardPoints += points;
    }

    getRewardPoints() {
        return this.rewardPoints;
    }
}