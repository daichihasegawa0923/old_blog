import { SecretEntity } from "../model/secret.entity";
import { UserId } from "../value/userId.value";

export interface ISecretRepository {
    findByUserId(userId: UserId): Promise<SecretEntity[]>;
    save(entity: SecretEntity): Promise<void>;
}