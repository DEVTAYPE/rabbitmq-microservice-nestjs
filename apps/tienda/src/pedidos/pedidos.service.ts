import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class PedidosService {
  constructor(@Inject('NOTIFICACIONES') private readonly clientNoti: ClientProxy, @Inject('PAGOS') private readonly clientPagos: ClientProxy) { }

  async crear(email: string, monto: number, response: Response) {
    const pedido = {
      pedidoId: Date.now(),
      email,
      monto
    }

    try {
      const res = await firstValueFrom(this.clientPagos.send('pagos.cobrar', {
        pedidoId: pedido.pedidoId,
        monto: pedido.monto
      }).pipe(timeout(5000)));

      const { pedidoId, estado } = res

      if (estado === "APROBADO") {
        this.clientNoti.emit('pedido.creado', pedido);
        return response.status(HttpStatus.CREATED).json({
        })
      }

      return response.status(HttpStatus.PAYMENT_REQUIRED).json({

      })

    } catch (error) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({

      })

    }




  }

  estado(pedidoId: number) {
    return firstValueFrom(
      this.clientNoti
        .send('notificaciones.estado', {
          pedidoId,
        })
        .pipe(timeout(5000)),
    );
  }
}
