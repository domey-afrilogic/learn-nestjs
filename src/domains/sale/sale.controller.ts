import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { Sale } from './sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}
  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleService.createSale(createSaleDto);
  }

  @Put(':id')
  updateSale(
    @Param() getSaleDto: GetSaleDto,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<boolean> {
    return this.saleService.updateSale(getSaleDto, updateSaleDto);
  }

  @Get(':id')
  getSale(@Param() getSaleDto: GetSaleDto): Promise<Sale> {
    return this.saleService.getSale(getSaleDto);
  }

  @Get()
  getAllSales(): Promise<Sale[]> {
    return this.saleService.getAllSales();
  }

  @Delete(':id')
  deleteSale(@Param() getSaleDto: GetSaleDto): Promise<boolean> {
    return this.saleService.deleteSale(getSaleDto);
  }
}
