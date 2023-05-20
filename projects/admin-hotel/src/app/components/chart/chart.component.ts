import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
 
    chart = new Chart({
        chart: {
          type: 'line',
          height: 325
        },
        title: {
          text: 'Beyond Hotel Statics'
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ]
        },
        yAxis: {
          title: {
            text: 'Revenue in VND'
          }
        },
        series: [
          
          {
            name: 'Revenue',
            type: 'line',
            color: '#727cf5',
            data: [
              2000000, 3000000, 1000000, 4000000, 4000000, 230000, 5030000, 6000000, 5000000, 2300000, 4200000, 5200000
            ]
          },
          {
            name: 'Service',
            type: 'line',
            color: '#ed9e20',
            data: [
                200030, 30303, 10303, 40303, 40303, 23030, 503030, 60303, 50303, 230300, 420300, 520300
            ]
          },
        ],
        credits: {
          enabled: false
        }
      })
    
      constructor() { }
    
      ngOnInit(): void {
      }
    
    }
    
