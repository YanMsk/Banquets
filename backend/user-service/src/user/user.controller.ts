import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get("/:id")
  getOne(@Param("id") userId: number) {
    return this.userService.getOneUser(userId);
  }
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Delete("/:id")
  delete(@Param("id") userId: number) {
    return this.userService.deleteUser(userId);
  }
}
