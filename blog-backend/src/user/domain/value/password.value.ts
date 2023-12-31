import { compareSync, hash, hashSync } from "bcrypt";
import { StringValue } from "src/common/domain/value/StringValue";

export class Password extends StringValue {
    private static MIN_LENGTH: number = 8;
    private static MAX_LENGTH: number = 20;

    constructor(value: string) {
        super();
        this.value = value;
    }

    public static create(value: string) {
        if (!Password.isValid(value)) {
            throw new Error("不正なパスワードです。");
        }
        const hashed = Password.toHash(value);
        return new Password(hashed);
    }

    private static isValid(value: string): boolean {
        if(!value) return false;
        if (value.length < Password.MIN_LENGTH
            || value.length > Password.MAX_LENGTH) {
                return false;
            }
        return true;
    }

    private static toHash(value: string): string {
        return hashSync(value, 10);
    }

    public compare(plane: string): boolean {
       return compareSync(plane, this.value);
    }
}