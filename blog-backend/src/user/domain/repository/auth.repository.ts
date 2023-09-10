import { AuthEntity } from "../model/auth.entity";
import { UserId } from "../value/userId.value";

export interface IAuthRepository {
    findByUserId(userId: UserId): Promise<AuthEntity[]>;
    save(entity: AuthEntity): Promise<void>;
}