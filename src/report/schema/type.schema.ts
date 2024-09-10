import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'type' })
export class Type {
  @Prop({ required: true })
  type_id: string;

  @Prop({ required: true })
  type_name: string;
}
export type TypeDocument = Type & Document;
export const TypeSchema = SchemaFactory.createForClass(Type);
