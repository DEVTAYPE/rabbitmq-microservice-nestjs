import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class PedidosService {
  constructor(@Inject('NOTIFICACIONES') private readonly client: ClientProxy) {}

  crear(email: string) {
    const pedido = {
      pedidoId: Date.now(),
      email,
    };

    // this.client
    //   .send('notificaciones.estado', {
    //     pedidoId: pedido.pedidoId,
    //   }).subscribe();
    this.client.emit('pedido.creado', pedido);
    return pedido;
  }

  estado(pedidoId: number) {
    return firstValueFrom(
      this.client
        .send('notificaciones.estado', {
          pedidoId,
        })
        .pipe(timeout(5000)),
    );
  }
}
