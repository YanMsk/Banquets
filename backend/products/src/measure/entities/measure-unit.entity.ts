import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "../../products/entities/product.entity";

interface MeasureCreateAttrs {
  name: string;
}

@Table({ tableName: "measures" })
export class Measure extends Model<Measure, MeasureCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @HasMany(() => Product)
  product: Product[];
}
