import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './sale.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/connect-mongo-test';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleSchema, Sale } from './sale.schema';

describe('SaleService', () => {
  let saleService: SaleService;

  beforeAll(async () => {
    const Sale: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Sale', schema: SaleSchema }]),
      ],
      providers: [SaleService],
    }).compile();

    saleService = Sale.get<SaleService>(SaleService);
  });

  describe('root', () => {
    let record: Sale;

    it('should be defined', () => {
      expect(saleService).toBeDefined();
    });
    it('should return empty array', async () => {
      const res = await saleService.getAllSales();
      expect(res).toMatchObject([]);
    });

    it('should create a sale', async () => {
      const res = await saleService.createSale({
        amount: 10,
        destination: 'Accra',
        createdBy: 'sdfjjbsdjhbv',
      });
      expect(res.destination).toBe('Accra');
      expect(res.createdBy).toBe('sdfjjbsdjhbv');
      record = res;
    });

    it('should fetch all sales expecting one record', async () => {
      const res = await saleService.getAllSales();
      expect(res.length).toBe(1);
      expect(res[0].destination).toBe(record.destination);
    });

    it('should fetch a single sale', async () => {
      const res = await saleService.getSale({
        id: record._id,
      });
      expect(res.destination).toBe(record.destination);
    });

    it('should update a single sale', async () => {
      const res = await saleService.updateSale(
        {
          id: record._id,
        },
        {
          amount: 12,
        },
      );
      expect(res).toBeTruthy();
    });

    it('should check if update changed necessary values', async () => {
      const res = await saleService.getSale({
        id: record._id,
      });
      expect(res.amount).toEqual(12);
    });

    it('should delete sale', async () => {
      const res = await saleService.deleteSale({
        id: record._id,
      });
      expect(res).toEqual(true);
    });

    it('should fetch all sales expecting zero records', async () => {
      const res = await saleService.getAllSales();
      expect(res.length).toBe(0);
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
