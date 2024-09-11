import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Report, ReportDocument } from "./schema/report.schema";
import { Type, TypeDocument } from "./schema/type.schema";
import { SubType, SubTypeDocument } from "./schema/sub-type.schema";
import { IReport } from "./interface/report.interface";
import * as _ from "lodash";

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(Type.name) private typeModel: Model<TypeDocument>,
    @InjectModel(SubType.name) private subTypeModel: Model<SubTypeDocument>
  ) {}

  async getReportsByMonthAndYear(
    month: string,
    year: string
  ): Promise<Report[]> {
    const data = await this.reportModel
      .find({ rec_month: month, rec_year: year }, { _id: 0 })
      .lean();
    return data;
  }

  async mapTypeToNameAndSubtype(reports: Report[]): Promise<IReport[]> {
    const name = await this.typeModel.find({}, { _id: 0 }).lean();
    const subType = await this.subTypeModel.find({}, { _id: 0 }).lean();
    const updatedData = reports.map((report) => ({
      ...report,
      name:
        name.find(({ type_id }) => type_id === report.type_id)?.type_name ||
        "Other",
      subType:
        subType.find(({ sub_type_id }) => sub_type_id === report.sub_type_id)
          ?.sub_type_name || "Other",
    }));
    return updatedData;
  }
  async getMonthlySummaryForPieChart(month: string, year: string) {
    const reports = await this.getReportsByMonthAndYear(month, year);
    const totalAmount = reports.reduce(
      (sum, report) => (sum += +report.amount),
      0
    );

    const data = await this.mapTypeToNameAndSubtype(reports);

    const aggregatedByType = _.groupBy(data, "name");

    const chartData = Object.keys(aggregatedByType).map((type) => {
      const typeTotal = aggregatedByType[type].reduce(
        (sum, report) => (sum += +report.amount),
        0
      );
      const subTypeCounts = _.countBy(
        aggregatedByType[type].map((item) => item.subType)
      );
      return {
        name: type,
        subTypeCounts: subTypeCounts,
        percentage: ((typeTotal / totalAmount) * 100).toFixed(2),
      };
    });

    return {
      labels: chartData.map((item) => item.name),
      data: chartData.map((item) => item.percentage),
      subTypeCounts: chartData.map((item) => item.subTypeCounts),
      totalAmount,
    };
  }
}
