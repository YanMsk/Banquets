import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Request } from "express";

@UseGuards(AuthGuard)
@Controller("product")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Req() req: Request, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req, createProductDto);
  }

  @Get()
  findAll(@Req() req: Request, @Query("id") id: number) {
    if (id !== undefined) {
      return this.productsService.findOne(req, id);
    } else {
      return this.productsService.findAll(req);
    }
  }

  @Put()
  update(@Req() req: Request, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(req, updateProductDto);
  }

  @Delete()
  remove(@Req() req: Request, @Query("id") id: number) {
    return this.productsService.remove(req, id);
  }
}
