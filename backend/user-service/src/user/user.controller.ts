import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AuthGuard } from "src/guards/auth.guard";
import { Request } from "express";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(@Req() req: Request, @Query("id") userId: number) {
    if (!userId) {
      return this.userService.getAllUsers(req);
    } else {
      return this.userService.getOneUser(req, userId);
    }
  }
  @UsePipes(ValidationPipe)
  @Post()
  create(@Req() req: Request, @Body() userDto: CreateUserDto) {
    return this.userService.createUser(req, userDto);
  }

  @Delete()
  delete(@Req() req: Request, @Query("id") userId: number) {
    return this.userService.deleteUser(req, userId);
  }
}
