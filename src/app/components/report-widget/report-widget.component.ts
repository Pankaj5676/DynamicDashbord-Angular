import { CommonModule } from '@angular/common';
import { AfterViewInit, asNativeElements, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-report-widget',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './report-widget.component.html',
  styleUrl: './report-widget.component.scss'
})
export class ReportWidgetComponent implements AfterViewInit {
  canvas: any;
  ctx: any;

  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };

  pieChart: any;

  ngAfterViewInit(): void {
this.pieChartBrowser();
  }

  pieChartBrowser(): void {

    if (!this.pieCanvas?.nativeElement) {
      console.error('Canvas element not found');
      return;
    }

    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');


    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Apple', 'Hp', 'Sony', 'Samsung', 'Nokia'],
        datasets: [{
          backgroundColor: ['rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(25, 236, 159)',
            'rgb(42, 237, 35)'],
            data:[50,30,40,55,10]
        }]

      }
    });

  }

}
