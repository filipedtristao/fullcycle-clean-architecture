export interface InputFindCustomerDTO {
    id: string;
}

export interface OutputFindCustomerDTO {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        zip: string;
    }
}