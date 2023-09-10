import { BaseEntity } from "src/common/domain/entity/BaseEntity";
import { Password } from "../value/password.value";
import { UserId } from "../value/userId.value";

export class SecretEntity extends BaseEntity {
    private _userId: UserId;

    public get userId() {
        return this._userId;
    }

    public set userId(v: UserId) {
        this._userId = v;
    }

    private _password: Password;

    public get password() {
        return this._password;
    }

    public set password(v: Password) {
        this._password = v;
    }

    public static create(cmd: SecretCreateCommand): SecretEntity {
        const entity = new SecretEntity();
        entity.init();
        entity.userId = cmd.userId;
        entity.password = cmd.password;
        return entity;
    }

}

export type SecretCreateCommand = {
    userId: UserId,
    password: Password
}