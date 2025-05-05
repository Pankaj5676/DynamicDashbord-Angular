import { Component } from '@angular/core';
import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { ReportWidgetComponent } from '../report-widget/report-widget.component';
import { TableWidgetComponent } from '../table-widget/table-widget.component';
import { CommonModule } from '@angular/common';
import{ Chart,registerables} from 'chart.js'
import { CdkDragDrop, DragDropModule ,moveItemInArray} from '@angular/cdk/drag-drop'
import { NewComponentComponent } from '../../new-component/new-component.component';
import { ResizableModule, ResizeEvent,ResizableDirective } from 'angular-resizable-element';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,DragDropModule,ResizableModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor() {
    this.loadSavedDashboardNames(); // Load saved names on component load
  }

  dashboardName: string = '';
savedDashboardNames: string[] = [];


  widgets: { type: string; width: number; height: number }[] = [];

  

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
    const widgetExists = this.widgets.some((widget) => widget.type === type);
    if (!widgetExists) {
      this.widgets.push({ type, width: 300, height: 200 });
    } else {
      alert(`${type} widget already added!`);
    }
  }
  

  onResizeEnd(event: ResizeEvent, index: number): void {
    const { rectangle } = event;
    if (rectangle && rectangle.width && rectangle.height) {
      this.widgets[index].width = rectangle.width;
      this.widgets[index].height = rectangle.height;
    }
  }


  saveDashboard() {
    if (!this.dashboardName.trim()) {
      alert('Please enter a dashboard name!');
      return;
    }
    const dataToSave = JSON.stringify(this.widgets);
    localStorage.setItem(`dashboard_${this.dashboardName}`, dataToSave);
    this.loadSavedDashboardNames(); // Refresh saved names
    alert(`Dashboard '${this.dashboardName}' saved!`);
  }
  
  // Load dashboard layout
  loadDashboard(name: string) {
    const savedData = localStorage.getItem(`dashboard_${name}`);
    if (savedData) {
      this.widgets = JSON.parse(savedData);
      this.dashboardName = name; // Update name in input field
    } else {
      alert(`Dashboard '${name}' not found!`);
    }
  }
  
  // Load saved dashboard names
  loadSavedDashboardNames() {
    const keys = Object.keys(localStorage);
    this.savedDashboardNames = keys
      .filter((key) => key.startsWith('dashboard_'))
      .map((key) => key.replace('dashboard_', ''));
  }


}
