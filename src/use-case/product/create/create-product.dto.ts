export interface CreateProductDtoInput {
    name: string;
    type: 'A' | 'B';
    price: number;
}

export interface CreateProductDtoOutput {
    id: string;
    name: string;
    price: number;
}