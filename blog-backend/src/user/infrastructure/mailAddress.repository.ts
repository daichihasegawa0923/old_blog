import { Injectable } from "@nestjs/common";
import { MailAddress } from "@prisma/client";
import { MailAddressEntity } from "../domain/model/mailAddress.entity";
import { IMailAddressRepository } from "../domain/repository/mailAddress.repository";
import { MailAddress as MailAddressValue } from "../domain/value/mailAddress.value";
import { UserId } from "../domain/value/userId.value";
import { PrismaRepositoryBase } from "./prisma.repository.base";

@Injectable()
export class MailAddressrepository 
extends PrismaRepositoryBase 
implements IMailAddressRepository {
    async findByUserId(userId: UserId): Promise<MailAddressEntity[]> {
        const data = await this.prismaService.mailAddress.findMany({where: {userId: userId.value}});
        const entities: MailAddressEntity[] = data.map(d=> this.toEntity(d));
        return entities;
    }
    async findByAddress(adress: MailAddressValue): Promise<MailAddressEntity> {
        const data = await this.prismaService.mailAddress.findUnique({where: {address: adress.value}});
        return this.toEntity(data);
    }

    async save(entity: MailAddressEntity): Promise<void> {
        await this.prismaService.mailAddress.upsert({
            where: {
                id: entity.id
            },
            update: {
                address: entity.address.value,
                userId: entity.userId.value,
                deleted: entity.deleted
            },
            create: {
                id: entity.id,
                address: entity.address.value,
                userId: entity.userId.value,
                deleted: entity.deleted
            }
        })
    }

    private toEntity(data: MailAddress) {
        if (!data) return null;
        const entity = new MailAddressEntity();
        entity.id = data.id;
        entity.userId = new UserId(data.userId);
        entity.address = new MailAddressValue(data.address);
        entity.deleted = data.deleted;
        return entity;
    }
}