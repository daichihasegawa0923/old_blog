import { MailAddressEntity } from "../model/mailAddress.entity";
import { MailAddress } from "../value/mailAddress.value";
import { UserId } from "../value/userId.value";

export interface IMailAddressRepository {
    findByUserId(userId: UserId): Promise<MailAddressEntity[]>;
    findByAddress(adress: MailAddress): Promise<MailAddressEntity>;
    save(entity: MailAddressEntity): Promise<void>
}