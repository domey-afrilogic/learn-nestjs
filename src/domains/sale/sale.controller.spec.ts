import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

describe('SaleController', () => {
  let saleController: SaleController;

  beforeEach(async () => {
    const Sale: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      providers: [SaleService],
    }).compile();

    saleController = Sale.get<SaleController>(SaleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(saleController.getAllSales()).toMatchObject(['Hello World Sale!']);
    });
  });
});
