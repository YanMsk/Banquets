import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable, map, catchError, of } from "rxjs";
import { LoginService } from "src/login/login.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    return this.loginService
      .check(req)
      .then((user) => {
        req.user = user;
        return true;
      })
      .catch(() => {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      });
  }
}
