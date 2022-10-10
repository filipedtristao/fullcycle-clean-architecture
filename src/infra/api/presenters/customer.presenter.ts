import { toXML } from "jstoxml";
import { ListCustomerDtoOutput } from "../../../use-case/customer/list/list-customer.dto";

export default class CustomerPresenter {
    public static toXml(data: ListCustomerDtoOutput): string {
        const xmlOptions = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        };

        return toXML({
            customers: data.customers.map((customer) => ({
                customer: {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        city: customer.address.city,
                        state: customer.address.state,
                        zip: customer.address.zip,
                    }
                },
            })),
        }, xmlOptions);
    }
}