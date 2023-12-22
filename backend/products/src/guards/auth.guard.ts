import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable, map, catchError } from "rxjs";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookies = req.headers.cookie;

    return this.httpService
      .get("http://localhost:9001/login/", {
        headers: { Cookie: cookies },
      })
      .pipe(
        map((response) => {
          req["user"] = response.data;
          return true;
        }),
        catchError(() => {
          throw new UnauthorizedException({
            message: "Пользователь не авторизован",
          });
        })
      );
  }
}
