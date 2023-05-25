import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ApiService } from '../../../_service/api.service';
@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
    chart!: any
    currentYear!: number;
    revenueForRoom!: any[];
    priceRoom!: number;
    percentRoomType!: string;
    totalPrice!: number;
    
    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.currentYear = new Date().getFullYear();
        this.api.getRevenueForRoom(this.currentYear).subscribe((res: any) => {

            this.revenueForRoom = res
            let totalPrice = 0;
            // for (let i = 0; i < res[i].price; i++) {
            //     let percentage = (res[i].price / totalPrice) * 100;
                
            //    console.log(percentage);
               
                
            // }

            for (let i = 0; i < res.length; i++) {
                totalPrice += res[i].price;
                this.totalPrice = totalPrice;
                var percent = ((res[i].price / this.totalPrice)*100 ).toFixed(2)
                this.percentRoomType = percent
            }
            this.chart = new Chart({
                chart: {
                    type: 'pie',
                    height: 350,
                    width: 350
                },
                title: {
                  text: 'The best rooms type in year'
                },
                xAxis: {
                    categories: this.revenueForRoom.map(item => item.typeRoomName)
                },
                yAxis: {
                    title: {
                        text: 'Revenue in %'
                    }
                },
                tooltip: {
                    valueSuffix: '%'
                  },
                series: [
                    {
                        type: 'pie',
                        data: [
                            {
                                name: res[0].typeRoomName,
                                y: Math.round((res[0].price / this.totalPrice)*100 ) ,
                                color: '#4A5959',
                               
                            },
                            {
                                name: res[1].typeRoomName,
                                y: Math.round((res[1].price / this.totalPrice)*100),
                                color: '#F0B82C',
                            },
                            {
                                name: res[2].typeRoomName,
                                y: Math.round((res[2].price / this.totalPrice)*100),
                                color: '#B7C9C9',
                            },

                        ]
                    }
                ],
                credits: {
                    enabled: false
                }
            })

        })
    }




}