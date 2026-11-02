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
          queue: 'notificaciones_wild_queue',
          persistent: true,
          queueOptions: {
            durable: true,
            wildcards: true,
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
export class PedidosModule {}
