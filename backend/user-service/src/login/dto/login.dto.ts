import { IsString, Length } from "class-validator";

export class LoginDto {
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 32, { message: "Не меньше 4 и не больше 32" })
  readonly login: string;
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 32, { message: "Не меньше 4 и не больше 32" })
  readonly password: string;
}
