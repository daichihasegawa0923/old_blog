import { StringValue } from "src/common/domain/value/StringValue";

export class UserName extends StringValue {

    private static MAX_LENGTH: number = 20;
    constructor (v: string) {
        super();
        if (!v || v.length > UserName.MAX_LENGTH ) {
            throw new Error("不正な値です。")
        }
        this.value = v;
    }
}