import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {


  public dataOfDoughnut: ChartData<'doughnut'> = { labels: [], datasets: [] };
  @Input() title: string = 'Sin titulo';
  @Input() percentages: number[] = [33, 33, 33];
  @Input() labels: string[] = ['label-1','label-2','label-3'];


  constructor() {
  }

  ngOnInit(): void {

    this.dataOfDoughnut = {
      labels: this.labels,
      datasets: [{ data: this.percentages }]
    }
    
  }
}
