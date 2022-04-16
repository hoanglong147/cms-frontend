import { Component, OnInit } from '@angular/core';
import { INCOME_TYPE_CODE, STATUS_CODE } from 'app/constant/constant';
import { ApiService } from 'app/services/api.service';
import { HelperService } from 'app/services/helper.service';
import Chart from 'chart.js';
import * as moment from 'moment';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  history_type: any[] = [{ color: '#e3e3e3', name: 'Income' }, { color: '#4acccd', name: 'Expenditure' }];
  summary = {
    highestLike: 0,
    totalComment: 0,
    totalDepartment: 0,
    totalIdeas: 0,
    totalLikes: 0,
    lastUpdate: new Date()
  }
  constructor(
    private apiService: ApiService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.getDashboardSummary();
    this.configChartMonth(null);
  }

  configChartMonth(data) {
    this.chartColor = "#FFFFFF";

    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
        },
        {
          borderColor: "#fcc468",
          backgroundColor: "#fcc468",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
        }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });
  }

  getDashboardSummary() {
    this.apiService.getSummary().subscribe((res: any) => {
      if (res['code'] == STATUS_CODE.SUCCESS) {
        // console.log(res);
        // const { graph, line_chart, pie, ...left_tover } = res.data;
        // const data = res.data;
        // this.configChartYear(graph);
        // this.configChartMonth(line_chart);
        // this.configPie(pie, data.history_type);
        // this.summary = left_tover;
        this.summary = {
          ...this.summary,
          ...res.data
        }
      }
    });
  }
}
