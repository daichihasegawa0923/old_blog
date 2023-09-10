import { StringValue } from "src/common/domain/value/StringValue";
import { ulid } from "ulid";

export class Token extends StringValue{

    constructor(value: string) {
        super();
        this.value = value;
    }

    public static create(): Token {
        const token = new Token("");
        token.value = ulid();
        return token;
    }
}