import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./user/auth.controller";
import { LoginController } from "./user/login.controller";
import { UserController } from "./user/user.controller";

@Module({
    imports: [
        UserModule,
    ],
    controllers: [
        UserController,
        AuthController,
        LoginController
    ]
})
export class ApiModule{}