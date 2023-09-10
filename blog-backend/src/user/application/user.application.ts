import { ErrorType } from "src/common/dto/request/error";
import { Result, ResultEmpty } from "src/common/dto/request/result";
import { AuthEntity } from "../domain/model/auth.entity";
import { MailAddressEntity } from "../domain/model/mailAddress.entity";
import { SecretEntity } from "../domain/model/secret.entity";
import { UserEntity } from "../domain/model/user.entity";
import { IAuthRepository } from "../domain/repository/auth.repository";
import { IMailAddressRepository } from "../domain/repository/mailAddress.repository";
import { ISecretRepository } from "../domain/repository/secret.repository";
import { IUserRepository } from "../domain/repository/user.repository";
import { MailAddress } from "../domain/value/mailAddress.value";
import { Password } from "../domain/value/password.value";
import { Token } from "../domain/value/token.value";
import { UserId } from "../domain/value/userId.value";
import { UserName } from "../domain/value/userName.value";
import { AuthCommand } from "./command/auth.command";
import { LoginCommand } from "./command/login.command";
import { UserRegisterCommand } from "./command/user.register.command";

export class UserApplication {
    private userRepo: IUserRepository;
    private authRepo: IAuthRepository;
    private secretRepo: ISecretRepository;
    private mailAddressRepo: IMailAddressRepository;

    public async register(cmd: UserRegisterCommand): Promise<Result> {
        const address = new MailAddress(cmd.mailAddress);
        const password = new Password(cmd.password);
        const name = new UserName(cmd.name);
        const errors: ErrorType[] = [];
        if (await this.mailAddressRepo.findByAddress(address)) {
            errors.push({code: 'UQ_ERROR', text: '登録済みのメールアドレスです。'});
        }
        const user = UserEntity.create({name});
        const userId = new UserId(user.id);
        const secret = SecretEntity.create({
            userId,
            password
        });
        const mailAddress = MailAddressEntity.create({
            userId,
            address
        });
        const auth = AuthEntity.create({userId});

        if (errors.length > 0) {
            return { errors };
        }

        await this.userRepo.save(user);
        await this.secretRepo.save(secret);
        await this.mailAddressRepo.save(mailAddress);
        await this.authRepo.save(auth);

        return ResultEmpty;
    }

    public async login(cmd: LoginCommand): Promise<Result> {
        const address = new MailAddress(cmd.address);
        const mailaddress = await this.mailAddressRepo.findByAddress(address);
        const errors: ErrorType[] = [];
        const secret = (
            await this.secretRepo.findByUserId(mailaddress.userId)
            ).find(s => !s.deleted);

        if (!secret) {
            errors.push({code: 'INVALID', text:"パスワード or メールアドレスが間違えています。"});
            return { errors };
        }
        const result = secret.password.compare(cmd.password);

        if (!result) {
            errors.push({code: 'INVALID', text:"パスワード or メールアドレスが間違えています。"});
            return { errors };
        }

        const auth = AuthEntity.create({
            userId: mailaddress.userId
        });

        this.authRepo.save(auth);
        return ResultEmpty;
    }

    public async auth(cmd: AuthCommand): Promise<Result> {
        const token = new Token(cmd.token);
        const userId = new UserId(cmd.userId);
        const auth = 
        (await this.authRepo.findByUserId(userId))
        .find(a => !a.delete && a.isActive() && a.token.equals(token));
        return { body: !!auth };
    }
 }