import ValidatorInterface from "../../@shared/validators/validator.interface";
import ProductInterface from "../entity/product.interface";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<ProductInterface> {
    validate(product: ProductInterface): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().moreThan(0, "Price must be greater than 0"),
            });
    
            schema.validateSync({
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
            }, { abortEarly: false });
        } catch (error) {
            const errors = error as yup.ValidationError;
            
            errors.errors.forEach((error) => {
                product.notification.addError({
                    message: error,
                    context: "product",
                });
            });
        }
    }
}