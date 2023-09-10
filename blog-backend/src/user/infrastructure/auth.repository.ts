import { AuthEntity } from "../domain/model/auth.entity";
import { IAuthRepository } from "../domain/repository/auth.repository";
import { Token } from "../domain/value/token.value";
import { UserId } from "../domain/value/userId.value";
import { PrismaRepositoryBase } from "./prisma.repository.base";

export class AuthRepository extends PrismaRepositoryBase implements IAuthRepository {

    async findByUserId(userId: UserId): Promise<AuthEntity[]> {
        const authData = await this.prismaService.auth.findMany({where: {userId: userId.value}});
        const authEntities: AuthEntity[] = authData.map(data => {
            const entity = new AuthEntity();
            entity.id = data.id;
            entity.deleted = data.deleted;
            entity.expireDate = data.expireDate;
            entity.token = new Token(data.token);
            entity.userId = new UserId(data.userId);
            return entity;
        });
        return authEntities;
    }

    async save(entity: AuthEntity): Promise<void> {
        await this.prismaService.auth.upsert({
            where: {
            id: entity.id
        },
        update: {
            deleted: entity.deleted,
            expireDate: entity.expireDate,
            token: entity.token.value,
            userId: entity.userId.value
        },
        create: {
            id: entity.id,
            deleted: entity.deleted,
            expireDate: entity.expireDate,
            token: entity.token.value,
            userId: entity.userId.value
        }
    })
    }
    
}