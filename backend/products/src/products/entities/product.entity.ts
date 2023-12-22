import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Measure } from "../../measure/entities/measure-unit.entity";

interface ProducCreateAttrs {
  login: string;
  password: string;
  role: string;
}

@Table({ tableName: "products" })
export class Product extends Model<Product, ProducCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Measure)
  unitId: number;

  @BelongsTo(() => Measure)
  measure: number;
}
