import { ValidationError } from "express-validator"

const getFirstError = (errors: ValidationError[]) => {
    if (errors.length > 0) {
        return errors[0].msg;
    } else {
        return null;
    }
}

export default getFirstError;