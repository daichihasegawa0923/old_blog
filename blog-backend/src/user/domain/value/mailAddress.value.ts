import { StringValue } from "src/common/domain/value/StringValue";

export class MailAddress extends StringValue {

    private static REGEX = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    constructor(address: string) {
        super();
        if (!this.isValid(address)) {
            throw Error("不正なメールアドレスです。");
        }
        this.value = address;
    }

    private isValid(address: string): boolean {
        return MailAddress.REGEX.test(address);
    }
}