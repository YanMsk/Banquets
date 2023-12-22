import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "./dto/login.dto";
import { Response, Request } from "express";

@Controller("login")
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.loginService.login(loginDto, response);
  }

  @Get()
  check(@Req() request: Request) {
    return this.loginService.check(request);
  }
}
