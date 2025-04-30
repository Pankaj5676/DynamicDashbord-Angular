import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-widget',
  imports: [MatTableModule],
  templateUrl: './table-widget.component.html',
  styleUrl: './table-widget.component.scss'
})
export class TableWidgetComponent {

  displayedColumns: string[] = ['name', 'email', 'phone'];
  dataSource = [
    { name: 'Alice', email: 'alice@example.com', phone: '1234567890' },
    { name: 'Bob', email: 'bob@example.com', phone: '0987654321' },
    { name: 'Charlie', email: 'charlie@example.com', phone: '5556667777' }
  ];

}
