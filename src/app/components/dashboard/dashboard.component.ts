import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';
import { ReportWidgetComponent } from '../report-widget/report-widget.component';
import { TableWidgetComponent } from '../table-widget/table-widget.component';
import { CommonModule } from '@angular/common';
import{ Chart,registerables} from 'chart.js'
import { CdkDrag, CdkDragDrop, DragDropModule ,moveItemInArray} from '@angular/cdk/drag-drop'
import { NewComponentComponent } from '../../new-component/new-component.component';
import { ResizableModule, ResizeEvent,ResizableDirective } from 'angular-resizable-element';
import { FormsModule } from '@angular/forms';

interface Widget {
  type: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,DragDropModule,ResizableModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  ngOnInit(): void {
      localStorage.clear();
  }

  @ViewChildren('widgetCard') widgetElements!: QueryList<ElementRef>;
  @ViewChildren(CdkDrag) dragInstances!: QueryList<CdkDrag>;

  constructor() {
    this.loadSavedDashboardNames(); // Load saved names on component load
  }
  dashboardName: string = '';
  savedDashboardNames: string[] = [];
  savedDashboards: { [key: string]: Widget[] } = {};

  widgets: Widget[] = [];
  selectedDashboard: string = '';


//widgets: { type: string; width: number; height: number; x: number; y: number }[] = [];


  

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
    this.widgets.push({
      type,
      width: 200,
      height: 150,
      x: 0,
      y: 0
    });
  }
  

  onResizeEnd(event: ResizeEvent, index: number): void {
    // Ensure that event is of the correct type
    const { rectangle } = event;
    if (rectangle && rectangle.width && rectangle.height) {
      this.widgets[index].width = rectangle.width;
      this.widgets[index].height = rectangle.height;
    }
  }

  onDragEnd(event: any, index: number): void {
    const position = event.source.getFreeDragPosition();
    this.widgets[index].x = position.x;
    this.widgets[index].y = position.y;
    console.log(`Widget ${index} moved: x=${position.x}, y=${position.y}`);
  }


  saveDashboard() {
    this.widgetElements.forEach((el, index) => {
      const nativeEl = el.nativeElement as HTMLElement;
      const parentRect = nativeEl.parentElement!.getBoundingClientRect();
      const rect = nativeEl.getBoundingClientRect();

      this.widgets[index].x = rect.left - parentRect.left;
      this.widgets[index].y = rect.top - parentRect.top;
      this.widgets[index].width = rect.width;
      this.widgets[index].height = rect.height;
    });

    this.savedDashboards[this.dashboardName] = JSON.parse(JSON.stringify(this.widgets));
    this.savedDashboardNames = Object.keys(this.savedDashboards);

    console.log(`Saved dashboard '${this.dashboardName}':`, this.savedDashboards[this.dashboardName]);
  }
  
  // Load dashboard layout
  loadDashboard(name: string) {
    this.widgets = JSON.parse(JSON.stringify(this.savedDashboards[name]));

    setTimeout(() => {
      this.dragInstances.forEach((dragInstance, index) => { // 🔥 NEW: using CdkDrag instances
        const widget = this.widgets[index];

        dragInstance.setFreeDragPosition({ x: widget.x, y: widget.y }); // 🔥 NEW: apply position via CDK API

        const nativeEl = dragInstance.getRootElement() as HTMLElement; // 🔥 NEW
        nativeEl.style.width = `${widget.width}px`;  // 🔥 NEW
        nativeEl.style.height = `${widget.height}px`; // 🔥 NEW
      });
    });
  }

  
  // Load saved dashboard names
  loadSavedDashboardNames() {
    const keys = Object.keys(localStorage);
    this.savedDashboardNames = keys
      .filter((key) => key.startsWith('dashboard_'))
      .map((key) => key.replace('dashboard_', ''));

      if (this.savedDashboardNames.length > 0) {
        this.selectedDashboard = this.savedDashboardNames[0];
      }
  }

}
