import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DominionComponent } from './dominion/dominion.component';
import { CardlistComponent } from './dominion/cardlist/cardlist.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DominionComponent,
    CardlistComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot( InMemoryDataService ),
    RouterModule.forRoot( [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'dominion',
        component: DominionComponent,
      },
      {
        path: 'dominion/cardlist',
        component: CardlistComponent,
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
