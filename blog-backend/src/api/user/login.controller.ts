import { Body, Controller, Post } from "@nestjs/common";
import { AuthCommand } from "src/user/application/command/auth.command";
import { LoginCommand } from "src/user/application/command/login.command";
import { UserApplication } from "src/user/application/user.application";

@Controller('/login')
export class LoginController {
    constructor(private readonly userApplication: UserApplication) {}

    @Post()
    async login(@Body() cmd: LoginCommand) {
        return await this.userApplication.login(cmd);
    }
}