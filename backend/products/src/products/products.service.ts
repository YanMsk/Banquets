import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { Measure } from "../measure/entities/measure-unit.entity";
import { InjectModel } from "@nestjs/sequelize";
import { Request } from "express";
import { AuthenticatedRequest } from "src/guards/interfaces/authenticated-request.intefrace";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product
  ) {}

  async create(req: AuthenticatedRequest, createProductDto: CreateProductDto) {
    const { unitId, ...productData } = createProductDto;
    const user = req.user;
    const product = await this.productRepository.create({
      userId: user.id,
      ...productData,
    });
    await product.$set("measure", unitId);
    product.unitId = unitId;
    return product;
  }

  async findAll(req: AuthenticatedRequest) {
    const user = req.user;
    if (user.role === "admin") {
      return await this.productRepository.findAll();
    } else if (user.role === "user") {
      return await this.productRepository.findAll({
        where: { userId: user.id },
      });
    }
  }

  async findOne(req: AuthenticatedRequest, id: number) {
    const product = await this.productRepository.findByPk(id);
    const user = req.user;
    if (!product) {
      throw new HttpException(
        "Такого продукта не существует",
        HttpStatus.NOT_FOUND
      );
    }
    if (user.id === product.userId || user.role === "admin") {
      return product;
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }

  async update(req: AuthenticatedRequest, updateProductDto: UpdateProductDto) {
    const { id, ...productData } = updateProductDto;
    const user = req.user;
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new HttpException(
        "Такого продукта не существует",
        HttpStatus.NOT_FOUND
      );
    }
    if (product.userId === user.id || user.role === "admin") {
      await this.productRepository.update(productData, { where: { id } });
      return { message: "Успешно обновлено" };
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }

  async remove(req: AuthenticatedRequest, id: number) {
    const product = await this.productRepository.findByPk(id);
    const user = req.user;
    if (!product) {
      throw new HttpException(
        "Такого продукта не существует",
        HttpStatus.NOT_FOUND
      );
    }

    if (product.userId === user.id || user.role === "admin") {
      await this.productRepository.destroy({ where: { id } });
      return { message: "Продукт был удалён" };
    } else {
      throw new HttpException("Отказано в доступе", HttpStatus.FORBIDDEN);
    }
  }
}
