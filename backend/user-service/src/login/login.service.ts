import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcryptjs";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.model";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.validateUser(loginDto);
    const jwt = await this.generateToken(user);
    response.cookie("jwt", jwt.token);
    return { message: "Succesfull auth" };
  }

  async check(request: Request) {
    const jwt = request.cookies["jwt"];
    const user = this.jwtService.verify(jwt);
    return user;
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByLogin(loginDto.login);
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: "Неверый email или пароль" });
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
