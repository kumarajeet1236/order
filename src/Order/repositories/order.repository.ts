import { DataSource, Repository } from 'typeorm';
import { Order } from '../../entities/orders.entity';
import { Injectable } from '@nestjs/common';
import { IOrder } from '../interfaces/order.interface';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(readonly dataSource: DataSource) {
    super(Order, dataSource.manager);
  }

  createOrder(data: IOrder[]) {
    return this.save(data);
  }

  updateUser(condition, data) {
    return this.update(condition, data);
  }
}
