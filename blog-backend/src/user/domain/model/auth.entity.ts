import * as dayjs from "dayjs";
import { BaseEntity } from "src/common/domain/entity/BaseEntity";
import { Token } from "../value/token.value";
import { UserId } from "../value/userId.value";

export class AuthEntity extends BaseEntity {

    private _userId: UserId;

    public get userId() : UserId {
        return this._userId;
    }

    public set userId(v : UserId) {
        this._userId = v;
    }
    
    private _token: Token;

    public get token() : Token {
        return this._token;
    }

    public set token(v: Token) {
        this._token = v;
    }

    private _expireDate: Date;

    public get expireDate(): Date {
        return this._expireDate;
    }

    public set expireDate(v: Date) {
        this._expireDate = v;
    }

    public static create(cmd: AuthCreateCommand): AuthEntity {
        const entity = new AuthEntity();
        entity.init();
        entity.userId = cmd.userId
        entity.token = Token.create();
        // 2ヶ月後まで
        entity.expireDate = dayjs().add(2,'month').toDate();
        return entity;
    }

    public isActive(): boolean {
        return dayjs().isBefore(this.expireDate);
    }
}

export type AuthCreateCommand = {
    userId: UserId,
}