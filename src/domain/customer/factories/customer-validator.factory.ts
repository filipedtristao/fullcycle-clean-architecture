import ValidatorInterface from "../../@shared/validators/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validators/customer.yup.validator";

export default class CustomerValidatorFactory {
    static create(): ValidatorInterface<Customer> {
        return new CustomerYupValidator();
    }
}
