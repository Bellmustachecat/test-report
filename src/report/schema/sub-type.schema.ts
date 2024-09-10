import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'sub_type' })
export class SubType {
  @Prop({ required: true })
  sub_type_id: string;

  @Prop({ required: true })
  type_id: string;

  @Prop({ required: true })
  sub_type_name: string;
}
export type SubTypeDocument = SubType & Document;
export const SubTypeSchema = SchemaFactory.createForClass(SubType);
