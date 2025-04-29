import { Component, OnInit } from '@angular/core';
import{Chart,registerables,ChartConfiguration,ChartType,BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend} from 'chart.js'

@Component({
  selector: 'app-chart-widget',
  imports: [],
  templateUrl: './chart-widget.component.html',
  styleUrl: './chart-widget.component.scss'
})


export class ChartWidgetComponent implements OnInit{
  ngOnInit(): void {

    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );


    const chartData: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Sales',
          data: [120, 150, 180, 90, 200],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Monthly Sales' }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, chartData);
    }
  }
}
