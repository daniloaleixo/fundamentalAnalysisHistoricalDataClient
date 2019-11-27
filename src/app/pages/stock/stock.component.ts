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

  public stock: IStock;

  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.route.params.subscribe((paramMap) => this.getStockInfo(paramMap.stockCode));
  }
    
   
  private getStockInfo(stockID: string) {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          getStock(id: "${stockID}") {
            stockCode
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
        (result: ApolloQueryResult<{ getStock: IStock }>) => {
          this.stock = result.data.getStock;
        }
      )
  }

}
