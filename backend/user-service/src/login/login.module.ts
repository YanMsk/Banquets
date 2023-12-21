import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECTET",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
})
export class LoginModule {}
