import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserApplication } from "./application/user.application";
import { AuthRepository } from "./infrastructure/auth.repository";
import { MailAddressrepository } from "./infrastructure/mailAddress.repository";
import { SecretRepository } from "./infrastructure/secret.repository";
import { UserRepository } from "./infrastructure/user.repository";

@Module({
  providers: [
    UserApplication,
    PrismaService,
    {
        useClass: AuthRepository,
        provide: 'IAuthRepository'
    },
    {
        useClass: UserRepository,
        provide: "IUserRepository"
    },
    {
      useClass: MailAddressrepository,
      provide: "IMailAddressRepository"
    },
    {
      useClass: SecretRepository,
      provide: "ISecretRepository"
    }
  ],
  exports: [
    UserApplication,
  ]
})
export class UserModule{};