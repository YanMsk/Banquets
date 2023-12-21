import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers() {
    const user = await this.userRepository.findAll({ include: { all: true } });
    return user;
  }

  async getOneUser(userId: number) {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException(
        "Такого пользователя не сущетсвует",
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async createUser(userDto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { login: userDto.login },
    });
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким логином уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userRepository.create({
      ...userDto,
      password: hashPassword,
    });
    return user;
  }

  async deleteUser(userId: number) {
    const candidate = await this.userRepository.findByPk(userId);
    if (!candidate) {
      throw new HttpException(
        "Такого пользователя не сущетсвует",
        HttpStatus.NOT_FOUND
      );
    }
    await this.userRepository.destroy({ where: { id: userId } });
    return { message: "Пользователь успешно удалён" };
  }
  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }
}
