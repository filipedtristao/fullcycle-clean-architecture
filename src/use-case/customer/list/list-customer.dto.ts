export interface ListCustomerDtoInput {}

export interface ListCustomerDtoOutput {
    customers: {
        id: string;
        name: string;
        address: {
            street: string;
            number: string;
            city: string;
            state: string;
            zip: string;
        };
    }[];
}