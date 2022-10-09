import Entity from "../../@shared/entities/entity";
import NotificationError from "../../@shared/notifications/notification.error";
import ProductValidationFactory from "../factories/product-validation.factory";
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
        ProductValidationFactory.create().validate(this);
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