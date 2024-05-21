import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cart } from 'src/entities/carts.entity';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(readonly dataSource: DataSource) {
    super(Cart, dataSource.manager);
  }

  getCartProducts(data: { userId: string }) {
    return this.createQueryBuilder('cart')
      .leftJoinAndMapOne(
        'cart.product',
        Product,
        'product',
        'product.id = cart.productId',
      )
      .where('user.userId=:userId', {
        userId: data.userId,
      })
      .getMany();
  }

  deleteUserCart(data: { userId: string }) {
    return this.delete({ userId: data.userId });
  }
}
