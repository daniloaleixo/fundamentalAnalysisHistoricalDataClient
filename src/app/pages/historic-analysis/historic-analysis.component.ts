import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from "lodash";
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { ChartDataSets, ChartOptions } from 'chart.js';
import gql from 'graphql-tag';
import { BaseChartDirective, Label } from 'ng2-charts';
import { IStock } from '../../interfaces/response.interface';


@Component({
  selector: 'app-historic-analysis',
  templateUrl: './historic-analysis.component.html',
  styleUrls: ['./historic-analysis.component.scss']
})
export class HistoricAnalysisComponent implements OnInit {

  public stockCodes: string[] = [];
  public sampleStocks: string[] = [];
  public choosenStocks: Array<string>;

  public allProperties: string[] = [];
  public sampleProperty: string[] = [];
  public choosenProperties: string[] = [];



  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {},
  };
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { read: true }) chart: BaseChartDirective;

  constructor(private apollo: Apollo) {
  }



  ngOnInit() {

    // Get stock codes
    this.apollo
      .watchQuery({
        query: gql`
          {
            allStockCodes
          }
        `,
      })
      .valueChanges.subscribe((result: ApolloQueryResult<{ allStockCodes: string[] }>) => {
        this.stockCodes = result.data.allStockCodes;
        this.sampleStocks = this.stockCodes.filter(a => a == "PETR4");
        this.sampleStocks.map(a => this.choosenStocks.push(a));
        this._query();
      });

    // Get properties
    this.apollo
      .watchQuery({
        query: gql`
          {
            allProperties
          }
        `,
      })
      .valueChanges.subscribe((result: ApolloQueryResult<{ allProperties: string[] }>) => {
        this.allProperties = result.data.allProperties;
        this.sampleProperty = this.allProperties.filter(a => a == "score");
        this.sampleProperty.map(a => this.choosenProperties.push(a));
        this._query();
      });
  }

  public addStock(event) {
    this.choosenStocks = event;
    this._query();
  }

  public addProperty(event) {
    this.choosenProperties = event;
    this._query();
  }




  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  // Get the information from server
  private _query() {
    const allIDs = `${this.choosenStocks.map(a => `"${a}"`).join(",")}`;
    this.apollo
      .watchQuery({
        query: gql`
        {
          compare(ids: [${allIDs}]) {
            ${this.choosenProperties.map(a => `${a}\n`)}
            timestamp
            stockCode
          }
        }
        `,
      })
      .valueChanges
      .subscribe((result: ApolloQueryResult<{ compare: IStock[] }>) => this._buildChart(result.data.compare));
  }


  private _buildChart(stocks: IStock[]): void {
    // Make the date right

    stocks = stocks.map(s => ({ ...s, timestamp: new Date(Number(s.timestamp)) }));
    console.log(stocks);

    const hashOfDates: { [date: string]: Array<IStock> } = {};
    stocks.forEach(s => {
      const date: string = `${s.timestamp.getFullYear()}/${s.timestamp.getMonth() + 1}/${s.timestamp.getDate()}`;
      if (hashOfDates[date]) hashOfDates[date].push(s);
      else hashOfDates[date] = [s];
    });


    console.log(hashOfDates);

    this.lineChartLabels = Object.keys(hashOfDates)
      .sort((a, b) => new Date(a) > new Date(b) ? 1 : -1);

    // public lineChartData: ChartDataSets[] = [
    //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },

    this.lineChartData = _.flatten(this.choosenStocks.map(s =>
      this.choosenProperties.map(p => {
        const chartData: ChartDataSets = {
          data: this.lineChartLabels
            .map(date => {
              const x = hashOfDates[date as string]
                .filter(stock => stock.stockCode == s)
                .map(stock => stock[p]);
              return x && x.length > 0 ? x.pop() : 0;
            }),
          label: `${s}--${p}`
        };

        return chartData;
      })
    ));

  }


}