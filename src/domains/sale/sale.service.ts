import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sale, SaleDocument } from './sale.schema';
import { Model } from 'mongoose';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<SaleDocument>,
  ) {}

  createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = new this.saleModel(createSaleDto);
    return sale.save();
  }

  async updateSale(
    getSaleDto: GetSaleDto,
    updateSaleDto: UpdateSaleDto,
  ): Promise<boolean> {
    const res = await this.saleModel.findById(getSaleDto.id);
    if (!res) {
      throw new HttpException('Sale Not Found', HttpStatus.BAD_REQUEST);
    }
    if (updateSaleDto.amount) {
      res.amount = updateSaleDto.amount;
    }
    if (updateSaleDto.destination) {
      res.destination = updateSaleDto.destination;
    }
    await res.save();
    return true;
  }

  async getSale(getSaleDto: GetSaleDto): Promise<Sale> {
    const res = await this.saleModel.findOne({
      id: getSaleDto.id,
      isDeleted: false,
    });
    if (!res) {
      throw new HttpException('Sale Not Found', HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  async getAllSales(): Promise<Sale[]> {
    const res = await this.saleModel.find({
      isDeleted: false,
    });
    return res;
  }

  async deleteSale(getSaleDto: GetSaleDto): Promise<boolean> {
    const res = await this.saleModel.findOne({
      id: getSaleDto.id,
      isDeleted: false,
    });
    if (!res) {
      throw new HttpException('Sale Not Found', HttpStatus.BAD_REQUEST);
    }
    res.isDeleted = true;
    res.deletedAt = new Date();
    await res.save();
    return true;
  }
}
