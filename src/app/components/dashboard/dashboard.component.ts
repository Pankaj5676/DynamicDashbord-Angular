import { Component } from '@angular/core';
import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { ReportWidgetComponent } from '../report-widget/report-widget.component';
import { TableWidgetComponent } from '../table-widget/table-widget.component';
import { CommonModule } from '@angular/common';
import{ Chart,registerables} from 'chart.js'
import { CdkDragDrop, DragDropModule ,moveItemInArray} from '@angular/cdk/drag-drop'
import { NewComponentComponent } from '../../new-component/new-component.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,DragDropModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  widgets: { type: string }[] = [];
  

  // widgets = [
  //   { type: 'chart' },
  //   { type: 'report' },
  //   { type: 'table' },
  //   {type:'newCompo'}
  // ];

  availableWidgets = [
    { type: 'chart' },
    { type: 'report' },
    { type: 'table' },
    { type: 'newCompo' }
  ];



  componentMap: { [key: string]: any } = {
    chart: ChartWidgetComponent,
    report: ReportWidgetComponent,
    table: TableWidgetComponent,
    newCompo:NewComponentComponent
  };

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
  }

  removeWidget(index: number) {
    this.widgets.splice(index, 1);
  }

  addWidget(type: string) {
    //this.widgets.push({ type });

    const widgetExists = this.widgets.some(widget => widget.type === type);

    if (!widgetExists) {
      this.widgets.push({ type });
    } else {
      alert(`${type} widget already added!`);
    }


  }



}
