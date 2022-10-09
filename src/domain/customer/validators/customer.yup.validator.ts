import ValidatorInterface from "../../@shared/validators/validator.interface";
import Customer from "../entity/customer";

import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(customer: Customer): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
            });
    
            schema.validateSync({
                id: customer.getId(),
                name: customer.getName(),
            }, { abortEarly: false });
        } catch (error) {
            const errors = error as yup.ValidationError;
            
            errors.errors.forEach((error) => {
                customer.notification.addError({
                    message: error,
                    context: "customer",
                });
            });
        }
    }
}