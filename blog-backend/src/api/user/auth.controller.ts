import { Body, Controller, Post } from "@nestjs/common";
import { AuthCommand } from "src/user/application/command/auth.command";
import { UserApplication } from "src/user/application/user.application";

@Controller('/auth')
export class AuthController {
    constructor(private readonly userApplication: UserApplication) {}

    @Post()
    async auth(@Body() cmd: AuthCommand) {
        return await this.userApplication.auth(cmd);
    }
}