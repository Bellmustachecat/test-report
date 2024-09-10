import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from './schema/report.schema';
import { TypeSchema } from './schema/type.schema';
import { SubTypeSchema } from './schema/sub-type.schema';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Report', schema: ReportSchema },
      { name: 'Type', schema: TypeSchema },
      { name: 'SubType', schema: SubTypeSchema },
    ]),
  ],
})
export class ReportModule {}
