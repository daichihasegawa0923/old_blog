import { UserEntity } from "../model/user.entity";

export interface IUserRepository {
    find(id: string): Promise<UserEntity>;
    save(entity: UserEntity): Promise<void>;
}