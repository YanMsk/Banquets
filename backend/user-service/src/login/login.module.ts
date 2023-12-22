import { Module, forwardRef } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECTET",
      signOptions: {
        expiresIn: "90m",
      },
    }),
  ],
  exports: [LoginService],
})
export class LoginModule {}
