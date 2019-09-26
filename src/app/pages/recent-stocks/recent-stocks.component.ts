import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { IStock } from '../../interfaces/response.interface';
import gql from 'graphql-tag';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-recent-stocks',
  templateUrl: './recent-stocks.component.html',
  styleUrls: ['./recent-stocks.component.scss']
})
export class RecentStocksComponent implements OnInit {

  // Table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { read: true }) sort: MatSort;


  public allProperties: string[] = [];


  constructor(private apollo: Apollo) {

  }


  ngOnInit() {

    this.dataSource.sort = this.sort;

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
        (result: ApolloQueryResult<{ recentStocks: IStock[] }>) => console.log(result.data.recentStocks)
      );
  }

}
