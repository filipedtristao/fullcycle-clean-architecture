import Entity from "../../@shared/entities/entity";
import NotificationError from "../../@shared/notifications/notification.error";
import ProductInterface from "./product.interface";

export default class ProductA extends Entity implements ProductInterface {
    constructor(
        private id: string,
        private name: string,
        private price: number,
    ) {
        super();

        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        };
    }

    validate() {
        if (this.id.length === 0) {
            this.notification.addError({
                message: "Id is required",
                context: 'product'
            });
        }

        if (this.name.length === 0) {
            this.notification.addError({
                message: "Name is required",
                context: 'product'
            });
        }

        if (this.price <= 0) {
            this.notification.addError({
                message: "Price must be greater than 0",
                context: 'product'
            });
        }
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    changeName(name: string) {
        this.name = name;
    }

    changePrice(price: number) {
        this.price = price;
    }
}