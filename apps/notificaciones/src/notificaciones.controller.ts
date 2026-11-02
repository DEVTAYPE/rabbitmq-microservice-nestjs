import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificacionesController {
  @EventPattern('pedido.creado')
  enviarCorreo(@Payload() data: { pedidoId: number; email: string }) {
    console.log(`Enviando correo del pedido ${data.pedidoId} a ${data.email}`);
  }

  @EventPattern('pedido.*')
  cualquierPedido(@Payload() data: unknown) {
    console.log(`[Wilcard] recibido: `, data);
  }

  @MessagePattern('notificaciones.estado')
  consultarEstado(@Payload() data: { pedidoId: number }) {
    return {
      pedidoId: data.pedidoId,
      enviado: true,
    };
  }
}
