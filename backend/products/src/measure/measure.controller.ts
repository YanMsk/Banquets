import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { MeasureService } from "./measure.service";
import { CreateMeasureDto } from "./dto/measure-create.dto";
import { UpdateMeasureDto } from "./dto/updateMeasureDto";
import { AuthGuard } from "src/guards/auth.guard";
import { Request } from "express";

@UseGuards(AuthGuard)
@Controller("measure_unit")
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Post()
  create(@Req() req: Request, @Body() createMeasureDto: CreateMeasureDto) {
    return this.measureService.create(req, createMeasureDto);
  }

  @Get()
  findAll(@Req() req: Request, @Query("id") id: number) {
    console.log("ID", id);
    if (id !== undefined) {
      return this.measureService.findOne(req, id);
    } else {
      return this.measureService.findAll(req);
    }
  }

  @Put()
  update(@Req() req: Request, @Body() updateMeasureDto: UpdateMeasureDto) {
    return this.measureService.update(req, updateMeasureDto);
  }

  @Delete()
  remove(@Req() req: Request, @Query("id") id: number) {
    return this.measureService.remove(req, id);
  }
}
