import { PartialType } from "@nestjs/mapped-types";
import { CreateMeasureDto } from "./measure-create.dto";

export class UpdateMeasureDto extends PartialType(CreateMeasureDto) {
  id: number;
}
