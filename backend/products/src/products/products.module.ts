import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { Product } from "./entities/product.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product]), HttpModule],
})
export class ProductsModule {}
