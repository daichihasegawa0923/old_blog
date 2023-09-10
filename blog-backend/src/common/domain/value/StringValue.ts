export abstract class StringValue {

    private _value: string;

    public get value() {
        return this._value;
    }

    protected set value(v: string) {
        this._value = v;
    }

    public equals(other: StringValue) {
        if (typeof this !== typeof other) {
            return false;
        }
        if (this.value === null && other.value === null) {
            return true;
        }
        if (this.value === null || other.value === null) {
            return false;
        }
        return this.value === other.value;
    }
}