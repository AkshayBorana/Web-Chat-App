import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { User } from "./User";
import { Conversation } from "./Conversation";

@Table({ paranoid: true })
export class Message extends Model<Message> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  content: string;

  // creating a table in db...
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  //Defining the relation, saying a message belongs to a user...
  @BelongsTo(() => User)
  user: User;

  //creating table
  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;
}
