import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { RegisterCommand, RegisterValidation } from "src/user/application/command/register.command";
import { UserApplication } from "src/user/application/user.application";
import { validate } from "src/validation/validation.checker";

@Controller('/user')
export class UserController{

    constructor(private readonly userApplication: UserApplication){}

    @Post('regist')
    async regist(@Body() cmd: RegisterCommand) {
        try {
        validate(cmd, new RegisterValidation());
        return await this.userApplication.regist(cmd);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}
