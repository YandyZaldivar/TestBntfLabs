import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ChartOptions } from 'chart.js';

import { User } from 'src/app/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() user: User;

  barChartOptions: ChartOptions;
  barChartType: string;
  barChartLegend: boolean;

  constructor() {
  }

  ngOnInit() {
    this.barChartOptions = {
      responsive: false,
      scales: {
        xAxes: [{}],
        yAxes: [{ ticks: { min: 0, max: 10 } }]
      }
    };
    this.barChartType = 'bar';
    this.barChartLegend = false;
  }

  getUserName(): string {
    return this.user.name_complete.split(',')[0].trim();
  }

  getUserLastName(): string {
    return this.user.name_complete.split(',')[1].trim();
  }

  getFullName(): string {
    return this.getUserName() + ' ' + this.getUserLastName();
  }

  getUserAge(): number {
    var birthday = moment(this.user.birthdate, "DD-MM-YYYY");
    return moment().diff(birthday, 'years');
  }

  calculateDV() {
    var m = 0, s = 1;
    var rut = this.user.rut;
    for (; rut; rut = Math.floor(rut / 10))
      s = (s + rut % 10 * (9 - m++ % 6)) % 11;
    return s ? s - 1 : 'K';
  }
}
