import { Component } from '@angular/core';
import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { ReportWidgetComponent } from '../report-widget/report-widget.component';
import { TableWidgetComponent } from '../table-widget/table-widget.component';
import { CommonModule } from '@angular/common';
import{ Chart,registerables} from 'chart.js'

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,ReportWidgetComponent,TableWidgetComponent,ChartWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  widgets = [
    { type: 'chart' },
    { type: 'report' },
    { type: 'table' }
  ];

  componentMap: { [key: string]: any } = {
    chart: ChartWidgetComponent,
    report: ReportWidgetComponent,
    table: TableWidgetComponent
  };

}
