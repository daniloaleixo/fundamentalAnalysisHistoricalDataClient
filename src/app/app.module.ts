import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { 
  MatChipsModule, MatIconModule, MatAutocompleteModule, MatSortModule,
  MatFormFieldModule, MatToolbarModule, MatTabsModule, MatTableModule,
  MatProgressBarModule
 } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsComponent } from './components/chips/chips.component';
import { RouterModule } from "@angular/router";
import { HistoricAnalysisComponent } from './pages/historic-analysis/historic-analysis.component';
import { RecentStocksComponent } from './pages/recent-stocks/recent-stocks.component';
import { StockComponent } from './pages/stock/stock.component'


@NgModule({
  declarations: [
    AppComponent,
    ChipsComponent,
    HistoricAnalysisComponent,
    RecentStocksComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    
    RouterModule.forRoot([
      { path: 'recent', component: RecentStocksComponent },
      { path: 'historic', component: HistoricAnalysisComponent },
      { path: 'stock/:stockCode', component: StockComponent },
      { path: '', redirectTo: '/recent', pathMatch: 'full' },
    ])
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: `${environment.API_ENDPOINT}/graphql`
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent],
  exports: [ChartsModule]
})
export class AppModule { }
