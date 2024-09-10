import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent  implements OnInit {
  basicData: any;

  basicOptions: any;

  ngOnInit(): void {
    this.basicData = {
      labels: ['Janv', 'Fev', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenues Annuelles',
          data: [540, -325, 702, 620, -10, -300, 250, -380, 350, 235, -50],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'transparent'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'transparent'
          },
          grid: {
            color: '#004',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: '#00f'
          },
          grid: {
            color: 'transparent',
            drawBorder: false
          }
        }
      }
    };
  }
}
