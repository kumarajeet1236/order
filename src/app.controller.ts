import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('INVENTORY_SERVICE') private readonly typesenseclient: ClientKafka,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    this.typesenseclient.subscribeToResponseOf(`inventryService`);
    await this.typesenseclient.connect();
  }

  async onModuleDestroy() {
    await this.typesenseclient.close();
  }
}
