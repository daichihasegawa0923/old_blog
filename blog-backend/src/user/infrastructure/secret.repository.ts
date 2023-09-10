import { Injectable } from "@nestjs/common";
import { Secret } from "@prisma/client";
import { SecretEntity } from "../domain/model/secret.entity";
import { ISecretRepository } from "../domain/repository/secret.repository";
import { Password } from "../domain/value/password.value";
import { UserId } from "../domain/value/userId.value";
import { PrismaRepositoryBase } from "./prisma.repository.base";

@Injectable()
export class SecretRepository 
  extends PrismaRepositoryBase implements ISecretRepository {

    async findByUserId(userId: UserId): Promise<SecretEntity[]> {
        const data = await this.prismaService.secret.findMany({
            where: {userId: userId.value}
        });
        return data.map(d => this.toEntity(d));
    }
    async save(entity: SecretEntity): Promise<void> {
        await this.prismaService.secret.upsert({
            where: {
                id: entity.id
            },
            update: {
                password: entity.password.value,
                userId: entity.userId.value,
                deleted: entity.deleted,
            },
            create: {
                id: entity.id,
                password: entity.password.value,
                userId: entity.userId.value,
                deleted: entity.deleted,
            }
        })
    }

    private toEntity(data: Secret) {
        if (!data) return null;
        const entity = new SecretEntity();
        entity.id = data.id;
        entity.password = new Password(data.password);
        entity.deleted = data.deleted;
        entity.userId = new UserId(data.userId);
        return entity;
    }
}