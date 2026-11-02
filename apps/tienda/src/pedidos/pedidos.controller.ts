import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidosService) {}

  @Post()
  crear(@Body() body: { email: string }) {
    return this.pedidoService.crear(body.email);
  }

  @Get(':id/notificacion')
  estado(@Param('id') id: string) {
    return this.pedidoService.estado(Number(id));
  }
}
