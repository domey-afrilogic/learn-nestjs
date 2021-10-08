import { Injectable } from '@nestjs/common';

@Injectable()
export class SaleService {
  createSale(): string {
    return 'Hello World Sale!';
  }

  updateSale(): string {
    return 'Hello World Sale!';
  }

  getSale(): string {
    return 'Hello World Sale!';
  }

  getAllSale(): string[] {
    return ['Hello World Sale!'];
  }
}
