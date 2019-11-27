import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { IStock } from '../../interfaces/response.interface';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) { }

  ngOnInit() {
    // this.route.paramMap
   
    this.apollo
      .watchQuery({
        query: gql`
        {
          recentStocks {
            stockCode: ID
            score
            stockPrice
            patrimonioLiquido
            liquidezCorrente
            ROE
            divSobrePatrimonio
            crescimentoCincoAnos
            precoSobreVP
            precoSobreLucro
            dividendos
            PSR
            precoSobreAtivo
            precoSobreCapitalGiro
            precoSobreEBIT
            precoSobreAtivoCirculante
            EVSobreEBIT
            margemEBIT
            margemLiquida
            ROIC
            liquidezDoisMeses
            timestamp
            tipo
            name
            setor
            subsetor
            max52sem
            volMed2M
            valorMercado
            valorFirma
            nAcoes
            lucroPorAcao
            margemBruta
            EBITsobreAtivo
            giroAtivos
            ativo
            divBruta
            divLiquida
            disponibilidades
            receitaLiquida
            lucroLiquido
          }
        }
        `,
      })
      .valueChanges
      .subscribe(
        (result: ApolloQueryResult<{ recentStocks: IStock[] }>) => {
          const stocks: IStock[] = result.data.recentStocks.sort((a, b) => b.score - a.score);
          // this.dataSource = new MatTableDataSource(stocks);
          // this.dataSource.sort = this.sort;
          // this.showLoading = false;
        }
      )
  }

}
