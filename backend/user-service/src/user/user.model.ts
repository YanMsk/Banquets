import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreateAttrs {
  login: string;
  password: string;
  role: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  role: string;
}
