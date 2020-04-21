import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import { User } from "./User";
import { Message } from "./Message";
import { UserConversation } from './UserConversation';

@Table({ paranoid: true })
export class Conversation extends Model<Conversation> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  //setting up relation, saying a conversation has many messages...
  @HasMany(() => Message)
  messages: Message[];

  @BelongsToMany(() => User, () => UserConversation)
  user: User[];
}
