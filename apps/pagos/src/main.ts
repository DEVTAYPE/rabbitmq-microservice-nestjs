import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PagosModule } from './pagos.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PagosModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@localhost:5672'],
        queue: 'pagos_queue',
        queueOptions: {
          durable: true
        }
      }
    }
  );
  await app.listen();
}
bootstrap();
