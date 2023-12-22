import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcryptjs";
import { AuthenticatedRequest } from "src/guards/interfaces/authenticated-request.intefrace";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers(req: AuthenticatedRequest) {
    const user = req.user;
    if (user.role === "admin") {
      return await this.userRepository.findAll();
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }

  async getOneUser(req: AuthenticatedRequest, userId: number) {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException(
        "Такого пользователя не сущетсвует",
        HttpStatus.NOT_FOUND
      );
    }
    if (user.id === req.user.id || req.user.role === "admin") {
      return user;
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }

  async createUser(req: AuthenticatedRequest, userDto: CreateUserDto) {
    if (req.user.role !== "admin") {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
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

  async deleteUser(req: AuthenticatedRequest, userId: number) {
    if (req.user.role !== "admin") {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
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
