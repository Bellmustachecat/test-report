import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'report' })
export class Report {
  @Prop({ required: true })
  sub_type_id: string;

  @Prop({ required: true })
  type_id: string;

  @Prop({ required: true })
  rec_year: string;

  @Prop({ required: true })
  rec_month: string;

  @Prop({ required: true })
  rec_day: string;

  @Prop({ required: true })
  amount: string;
}
export type ReportDocument = Report & Document;
export const ReportSchema = SchemaFactory.createForClass(Report);
