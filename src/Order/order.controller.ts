import { Body, Controller, Post, Res, Req, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OrderService } from './service/order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
@ApiBearerAuth()
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  async createOrder(
    @Body() body: CreateOrderDto,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      let order = await this.orderService.createOrder(body);

      return res.status(200).json({
        status: 'success',
        message: 'Order Place Successfully!',
        data: order,
      });
    } catch (e) {
      console.log('project create error', e);
      res.status(500).json({
        status: 500,
        message: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
