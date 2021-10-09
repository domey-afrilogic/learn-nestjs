import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema({ timestamps: true })
export class Sale {
  _id: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
