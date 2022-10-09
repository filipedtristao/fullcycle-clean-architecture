export interface UpdateCustomerDtoInput {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        zip: string;
    };
}

export interface UpdateCustomerDtoOutput {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        zip: string;
    };
};