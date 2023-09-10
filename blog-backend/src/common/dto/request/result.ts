import { ErrorType } from "src/common/dto/request/error";

export type Result = {
    body?: Object;
    errors?: ErrorType[];
}

export const ResultEmpty = {
    body: {}, errors: []
}