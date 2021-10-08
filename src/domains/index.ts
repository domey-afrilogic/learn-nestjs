import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ExpenseModule } from './expense/expense.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [AdminModule, ExpenseModule, SaleModule],
})
export class DomainModule {}
