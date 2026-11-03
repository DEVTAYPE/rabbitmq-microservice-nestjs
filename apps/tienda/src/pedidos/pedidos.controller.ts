import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidosService) { }

  @Post()
  crear(@Body() body: { email: string, monto: number }, @Res() res: Response) {
    return this.pedidoService.crear(body.email, body.monto, res);
  }

  @Get(':id/notificacion')
  estado(@Param('id') id: string) {
    return this.pedidoService.estado(Number(id));
  }
}
