import { IsEnum, IsString, Length } from "class-validator";

enum Roles {
  User = "user",
  Admin = "admin",
}

export class CreateUserDto {
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 32, { message: "Не меньше 4 и не больше 32" })
  readonly login: string;
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 32, { message: "Не меньше 4 и не больше 32" })
  readonly password: string;
  @IsString({ message: "Должно быть строкой" })
  @IsEnum(Roles, { message: "Указана неверная роль, введите admin или user" })
  readonly role: string;
}
