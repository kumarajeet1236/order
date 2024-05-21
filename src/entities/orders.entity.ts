import { IAddress } from 'src/Order/interfaces/order.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  productId: string;

  @Column({
    nullable: true,
    default: null,
  })
  userId: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: null,
  })
  address?: IAddress;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
