import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import KafkaInventryClientModule from '../kafka-inventery';
import { OrderRepository } from './repositories/order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './service/order.service';
import { CartRepository } from './repositories/cart.repository';

@Module({
  imports: [
    KafkaInventryClientModule,
    TypeOrmModule.forFeature([OrderRepository, CartRepository]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, CartRepository],
  exports: [],
})
export class OrderModule {}
