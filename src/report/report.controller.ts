import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('monthly')
  async getMonthlyReport(
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.reportService.getMonthlySummaryForPieChart(month, year);
  }
}
