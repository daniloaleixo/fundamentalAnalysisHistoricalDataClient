import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { MatChipsModule, MatIconModule, MatAutocompleteModule, MatFormFieldModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsComponent } from './components/chips/chips.component';


@NgModule({
  declarations: [
    AppComponent,
    ChipsComponent
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
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
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
