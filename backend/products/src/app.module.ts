import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./products/entities/product.entity";
import { Measure } from "./measure/entities/measure-unit.entity";
import { MeasureModule } from "./measure/measure.module";
import { ProductsModule } from "./products/products.module";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Product, Measure],
      autoLoadModels: true,
    }),
    MeasureModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
