import { BaseEntity } from "src/common/domain/entity/BaseEntity";
import { UserName } from "../value/userName.value";

export class UserEntity extends BaseEntity {

    private _name: UserName;

    public get name() {
        return this._name;
    }

    public set name(v: UserName) {
        this._name = v;
    }

    public static create(cmd: UserEntityCreateCommand): UserEntity {
        const entity = new UserEntity();
        entity.init();
        entity.name = cmd.name
        return entity;
    }
}

export type UserEntityCreateCommand = {
    name: UserName;
}