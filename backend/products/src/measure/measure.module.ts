import { Module } from "@nestjs/common";
import { MeasureController } from "./measure.controller";
import { MeasureService } from "./measure.service";
import { Measure } from "./entities/measure-unit.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [MeasureController],
  providers: [MeasureService],
  imports: [SequelizeModule.forFeature([Measure]), HttpModule],
})
export class MeasureModule {}
