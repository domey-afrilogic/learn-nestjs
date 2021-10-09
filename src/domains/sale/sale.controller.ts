import { Controller, Get, Post, Put } from '@nestjs/common';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}
  @Post()
  createSale(): string {
    return this.saleService.createSale();
  }

  @Put(':id')
  updateSale(): string {
    return this.saleService.updateSale();
  }

  @Get(':id')
  getSale(): string {
    return this.saleService.getSale();
  }

  @Get()
  getAllSales(): string[] {
    return this.saleService.getAllSale();
  }
}
