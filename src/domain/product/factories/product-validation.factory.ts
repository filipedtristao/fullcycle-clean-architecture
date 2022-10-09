import ValidatorInterface from "../../@shared/validators/validator.interface";
import ProductInterface from "../entity/product.interface";
import ProductYupValidator from "../validators/product.yup.validator";

export default class ProductValidationFactory {
    static create(): ValidatorInterface<ProductInterface> {
        return new ProductYupValidator();
    }
}