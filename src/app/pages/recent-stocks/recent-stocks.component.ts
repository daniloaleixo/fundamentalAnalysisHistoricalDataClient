import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { IStock } from '../../interfaces/response.interface';
import gql from 'graphql-tag';

@Component({
  selector: 'app-recent-stocks',
  templateUrl: './recent-stocks.component.html',
  styleUrls: ['./recent-stocks.component.scss']
})
export class RecentStocksComponent implements OnInit {

  public showLoading: boolean;

  // Table
  public displayedColumns: string[] = ["stockCode", "score", "stockPrice", "patrimonioLiquido", "liquidezCorrente", "ROE", "divSobrePatrimonio", "crescimentoCincoAnos", "precoSobreVP", "precoSobreLucro", "dividendos", "PSR", "precoSobreAtivo", "precoSobreCapitalGiro", "precoSobreEBIT", "precoSobreAtivoCirculante", "EVSobreEBIT", "margemEBIT", "margemLiquida", "ROIC", "liquidezDoisMeses", "timestamp",
  ];
  public dataSource;
  public tableHeight: number;


  @ViewChild(MatSort) sort: MatSort;


  public allProperties: string[] = [];


  constructor(private apollo: Apollo) {
    this.showLoading = true;

    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.tableHeight = h - 48 - 64 - 2;
  }


  ngOnInit() {
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
        console.log("allProperties", this.allProperties);
        this._query();
      });
  }


  private _query() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          recentStocks {
            ${this.allProperties.map(a => `${a}\n`)}
            timestamp
            stockCode
          }
        }
        `,
      })
      .valueChanges
      .subscribe(
        (result: ApolloQueryResult<{ recentStocks: IStock[] }>) => {
          const stocks: IStock[] = result.data.recentStocks.sort((a, b) => b.score - a.score);
          this.dataSource = new MatTableDataSource(stocks);
          this.dataSource.sort = this.sort;
          this.showLoading = false;
        }
      );
  }

}
