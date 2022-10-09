export default interface ProductInterface {
    validate(): void;
    getId(): string;
    getName(): string;
    getPrice(): number;
    changeName(name: string): void;
    changePrice(price: number): void;
}