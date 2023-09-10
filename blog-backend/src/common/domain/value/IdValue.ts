import { ulid } from "ulid";
import { StringValue } from "./StringValue";

export abstract class IdValue extends StringValue {
    constructor(id: string | undefined) {
        super();
        this.value = id;
    }
}