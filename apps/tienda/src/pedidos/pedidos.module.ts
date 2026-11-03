import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICACIONES',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin123@localhost:5672'],
          persistent: true,
          queue: 'notificaciones_queue',
          // queue: 'notificaciones_wild_queue',
          // wildcards: true,
          // exchangeType: 'topic',
          queueOptions: {
            durable: true,
            // arguments: {
            //   'x-message-ttl': 6000
            // }
          },
        },
      },
      {
        name: 'PAGOS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin123@localhost:5672'],
          queue: 'pagos_queue',
          persistent: true,
          // queue: 'notificaciones_wild_queue',
          // wildcards: true,
          // exchangeType: 'topic',
          queueOptions: {
            durable: true,
            // arguments: {
            //   'x-message-ttl': 6000
            // }
          },
        },
      },
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule { }
