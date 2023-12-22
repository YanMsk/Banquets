import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateMeasureDto } from "./dto/measure-create.dto";
import { Measure } from "./entities/measure-unit.entity";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateMeasureDto } from "./dto/updateMeasureDto";
import { AuthenticatedRequest } from "src/guards/interfaces/authenticated-request.intefrace";

@Injectable()
export class MeasureService {
  constructor(
    @InjectModel(Measure) private measureRepository: typeof Measure
  ) {}

  async remove(req: AuthenticatedRequest, id: number) {
    const user = req.user;
    const measure = await this.measureRepository.findByPk(id);
    if (!measure) {
      throw new HttpException(
        "Единица измерения не найдена",
        HttpStatus.NOT_FOUND
      );
    }

    if (measure.userId === user.id || user.role === "admin") {
      await this.measureRepository.destroy({ where: { id } });
      return { message: "Единица измерения была удалена" };
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }
  async update(req: AuthenticatedRequest, updateMeasureDto: UpdateMeasureDto) {
    const user = req.user;
    const { id, ...measureData } = updateMeasureDto;
    const measure = await this.measureRepository.findByPk(id);
    if (!measure) {
      throw new HttpException(
        "Такой единицы измерения не существует",
        HttpStatus.NOT_FOUND
      );
    }

    if (measure.userId === user.id || user.role === "admin") {
      await this.measureRepository.update(measureData, { where: { id } });
      return { message: "Успешно обновлено" };
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }
  async findOne(req: AuthenticatedRequest, id: number) {
    const user = req.user;
    const measure = await this.measureRepository.findByPk(id);
    if (!measure) {
      throw new HttpException(
        "Единица измерения не найдена",
        HttpStatus.NOT_FOUND
      );
    }
    if (user.id === measure.userId || user.role === "admin") {
      return measure;
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }
  async create(req: AuthenticatedRequest, createMeasureDto: CreateMeasureDto) {
    const user = req.user;
    const measure = await this.measureRepository.create({
      userId: user.id,
      ...createMeasureDto,
    });
    return measure;
  }
  async findAll(req: AuthenticatedRequest) {
    const user = req.user;
    if (user.role === "admin") {
      return await this.measureRepository.findAll();
    } else if (user.role === "user") {
      return await this.measureRepository.findAll({
        where: { userId: user.id },
      });
    }
  }
}
