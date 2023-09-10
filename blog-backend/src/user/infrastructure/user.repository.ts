import { Injectable } from "@nestjs/common";
import { UserEntity } from "../domain/model/user.entity";
import { IUserRepository } from "../domain/repository/user.repository";
import { UserName } from "../domain/value/userName.value";
import { PrismaRepositoryBase } from "./prisma.repository.base";

@Injectable()
export class UserRepository extends PrismaRepositoryBase implements IUserRepository {

    async find(id: string): Promise<UserEntity> {
        const userData = await this.prismaService.user.findUnique({where: {id}});
        if (!userData) return null;
 
        const userEntity = new UserEntity();
        userEntity.id = userData.id;
        userEntity.name = new UserName(userData.name);
        userEntity.deleted = userData.deleted;

        return userEntity;
    }
    async save(entity: UserEntity): Promise<void> {
        await this.prismaService.user.upsert({
            where: {
                id: entity.id
            },
            update: {
                name: entity.name.value,
                deleted: entity.deleted
            },
            create: {
                id: entity.id,
                name: entity.name.value,
                deleted: entity.deleted
            }
        });
    }
    
}