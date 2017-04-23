import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DominionComponent } from './dominion/dominion.component';
import { CardlistComponent } from './dominion/cardlist/cardlist.component';
import { RuleBooksComponent } from './dominion/rule-books/rule-books.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DominionComponent,
    CardlistComponent,
    RuleBooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
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
      },
      {
        path: 'dominion/rulebooks',
        component: RuleBooksComponent,
      }
    ], { useHash: true } ),
  ],
  providers: [
    { provide: 'DATA_DIR', useValue: './data' },
    { provide: 'DOMINION_DATA_DIR', useValue: './data/dominion' },

    // { provide: 'HOST_NAME', useValue: 'http://sv2.php.xdomain.ne.jp' },
    // { provide: 'HOST_NAME', useValue: 'http://192.168.33.10' },
    // { provide: 'HOST_NAME', useValue: 'http://192.168.33.1' },
    { provide: 'HOST_NAME', useValue: 'http://localhost:8000' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
