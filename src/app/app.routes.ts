import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartWidgetComponent } from './components/chart-widget/chart-widget.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'chart', component: ChartWidgetComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
