import { NestFactory } from '@nestjs/core';
import { NotificacionesModule } from './notificaciones.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificacionesModule,

    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672'],
        queue: 'notificaciones_wild_queue',
        queueOptions: {
          durable: true,
          wildcards: true
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
