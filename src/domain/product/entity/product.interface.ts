import Entity from "../../@shared/entities/entity";

export default interface ProductInterface extends Entity {
    validate(): void;
    getId(): string;
    getName(): string;
    getPrice(): number;
    changeName(name: string): void;
    changePrice(price: number): void;
}