import { Inject, Injectable } from "@nestjs/common";
import { AuthEntity } from "../domain/model/auth.entity";
import { MailAddressEntity } from "../domain/model/mailAddress.entity";
import { SecretEntity } from "../domain/model/secret.entity";
import { UserEntity } from "../domain/model/user.entity";
import { IAuthRepository } from "../domain/repository/auth.repository";
import { IMailAddressRepository } from "../domain/repository/mailAddress.repository";
import { ISecretRepository } from "../domain/repository/secret.repository";
import { IUserRepository } from "../domain/repository/user.repository";
import { MailAddressDomainService } from "../domain/service/mailAddress.domain.service";
import { MailAddress } from "../domain/value/mailAddress.value";
import { Password } from "../domain/value/password.value";
import { Token } from "../domain/value/token.value";
import { UserId } from "../domain/value/userId.value";
import { UserName } from "../domain/value/userName.value";
import { AuthCommand } from "./command/auth.command";
import { LoginCommand } from "./command/login.command";
import { RegisterCommand } from "./command/register.command";
import { AuthView } from "./dto/AuthView";

@Injectable()
export class UserApplication {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepo: IUserRepository,
        @Inject("IAuthRepository")
        private readonly authRepo: IAuthRepository,
        @Inject("ISecretRepository")
        private readonly secretRepo: ISecretRepository,
        @Inject("IMailAddressRepository")
        private readonly mailAddressRepo: IMailAddressRepository,
        private readonly mailAddressDomainService: MailAddressDomainService
    ){}

    public async regist(cmd: RegisterCommand): Promise<void> {
        const address = new MailAddress(cmd.mailAddress);
        const password = Password.create(cmd.password);
        const name = new UserName(cmd.name);
        const user = UserEntity.create({name});
        const userId = new UserId(user.id);
        const secret = SecretEntity.create({
            userId,
            password
        });
        const auth = AuthEntity.create({userId});

        await this.mailAddressDomainService.regist(userId, address);
        await this.userRepo.save(user);
        await this.secretRepo.save(secret);
        await this.authRepo.save(auth);
    }

    public async login(cmd: LoginCommand): Promise<AuthView> {
        const address = new MailAddress(cmd.mailAddress);
        const mailaddress = await this.mailAddressRepo.findByAddress(address);
        const secret = (
            await this.secretRepo.findByUserId(mailaddress.userId)
            ).find(s => !s.deleted);

        if (!secret) {
            throw Error("パスワード or メールアドレスが間違えています。");
        }
        const result = secret.password.compare(cmd.password);

        if (!result) {
            throw Error("パスワード or メールアドレスが間違えています。");
        }

        const auth = AuthEntity.create({
            userId: mailaddress.userId
        });

        this.authRepo.save(auth);
        return {userId: auth.userId.value, token: auth.token.value};
    }

    public async auth(cmd: AuthCommand): Promise<AuthView> {
        const token = new Token(cmd.token);
        const userId = new UserId(cmd.userId);
        const auth = 
        (await this.authRepo.findByUserId(userId))
        .find(a => !a.deleted && a.isActive() && a.token.equals(token));
        console.log(auth);
        return { userId: auth.userId.value, token: auth.token.value };
    }
 }