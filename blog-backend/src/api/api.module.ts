import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { UserController } from "./user/user.controller";

@Module({
    imports: [
        UserModule,
    ],
    controllers: [
        UserController,
    ]
})
export class ApiModule{}