import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CartRepository } from '../repositories/cart.repository';
import { Order } from '../../entities/orders.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { IOrder } from '../interfaces/order.interface';
import { DataSource } from 'typeorm';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderRepository) private orderRepository: OrderRepository,
    @Inject(CartRepository) private cartRepository: CartRepository,
    @Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientKafka,
    private dataSource: DataSource,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order[]> {
    try {
      let getCartDetail = await this.cartRepository.getCartProducts({
        userId: data.userId,
      });

      let orderProduct: IOrder[] = [];
      for (let cart of getCartDetail) {
        orderProduct.push({
          productId: cart.productId,
          userId: cart.userId,
        });
      }
      let order = await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          let order = await this.orderRepository.createOrder(orderProduct);

          let payload = {
            productId: orderProduct.map((val) => val.productId),
            userId: orderProduct[0].userId,
          };
          //reduce quantity from inventry
          let inventry: { status: string } = await lastValueFrom(
            this.inventoryClient.send('reduceProductQuantity', payload),
          );

          if (inventry.status == 'failure') {
            throw new Error('Inventry updation failed');
          }

          return order;
        },
      );

      return order;
    } catch (error) {
      throw new InternalServerErrorException(
        'Create Order Error ' + error.message,
      );
    }
  }
}
