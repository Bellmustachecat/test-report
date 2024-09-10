import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ReportModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
  ],
})
export class AppModule {}
