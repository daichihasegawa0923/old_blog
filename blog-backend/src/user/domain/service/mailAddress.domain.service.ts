import { Inject } from "@nestjs/common";
import { MailAddressEntity } from "../model/mailAddress.entity";
import { IMailAddressRepository } from "../repository/mailAddress.repository";
import { MailAddress } from "../value/mailAddress.value";
import { UserId } from "../value/userId.value";

export class MailAddressDomainService {
    @Inject("IMailAddressRepository")
    private readonly mailAddressRepo: IMailAddressRepository

    public regist = async(userId: UserId, mailAddress: MailAddress): Promise<void> => {
        if (await this.isExists(mailAddress)) {
            throw Error("登録済みのメールアドレスです");
        }
        const addressEntity = MailAddressEntity.create({userId, address: mailAddress});
        await this.mailAddressRepo.save(addressEntity);
    }

    public isExists = async (mailAddress: MailAddress): Promise<boolean> => {
        const address = await this.mailAddressRepo.findByAddress(mailAddress);
        return !!address;
    }
}