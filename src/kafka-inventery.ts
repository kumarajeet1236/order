import { ClientsModule, Transport } from '@nestjs/microservices';
import { constants } from './common/constants/constants';

export default ClientsModule.register([
  {
    name: 'INVENTORY_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        // clientId: 'typesense-client',
        brokers: [constants.KAFKA_BROKER],
      },
      consumer: {
        groupId: constants.INVENTORY_MICROSERVICE_GROUP_ID,
        allowAutoTopicCreation: true,
      },
      send: {
        acks: 0,
      },
    },
  },
]);
