import { BaseEntity } from "src/common/domain/entity/BaseEntity";
import { MailAddress } from "../value/mailAddress.value";
import { UserId } from "../value/userId.value";

export class MailAddressEntity extends BaseEntity {

    private _userId: UserId;

    public get userId() {
        return this._userId;
    }

    public set userId(v: UserId) {
        this._userId = v;
    }

    private _address: MailAddress;
    
    public get address() {
        return this._address;
    }
    
    public set address(v : MailAddress) {
        this._address = v;
    }

    public static create (cmd: MailAddressCreateCommand): MailAddressEntity {
            const entity = new MailAddressEntity();
            entity.init();
            entity.userId = cmd.userId;
            entity.address = cmd.address;
            return entity;
    }
}

export type MailAddressCreateCommand = {
    userId: UserId,
    address: MailAddress
}