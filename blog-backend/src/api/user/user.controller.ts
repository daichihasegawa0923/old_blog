import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Result } from "src/common/dto/request/result";
import { RegisterCommand } from "src/user/application/command/register.command";
import { UserApplication } from "src/user/application/user.application";

@Controller('/user')
export class UserController{

    constructor(private readonly userApplication: UserApplication){}

    @Post()
    async regist(@Body() cmd: RegisterCommand): Promise<Result> {
        try {
            return await this.userApplication.regist(cmd);
        } catch(e) {
            console.log(e);
            return {errors: [{text: e.message, code: 'ERROR'}]};
        }
    }
}
