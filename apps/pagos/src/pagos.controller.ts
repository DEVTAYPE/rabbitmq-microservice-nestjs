import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PagosController {
  @MessagePattern('pagos.cobrar')
  cobrarPago(
    @Payload() data: {
      pedidoId: string
      monto: number
    }
  ) {

    if (data.monto <= 1000) {
      return {
        pedidoId: data.pedidoId,
        estado: 'APROBADO'
      }
    }

    return {
      pedidoId: data.pedidoId,
      estado: 'RECHAZADO'
    }
  }
}
