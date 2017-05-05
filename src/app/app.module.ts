import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdIconModule, MdIconRegistry } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // md-tab

// import { dataGrid } from 'material-design-lite';
// import { MdDataTableModule } from 'ng2-md-datatable';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent                 } from './app.component';
import { HomeComponent                } from './home/home.component';
import { DominionComponent            } from './dominion/dominion.component';
import { CardlistComponent            } from './dominion/cardlist/cardlist.component';
import { RuleBooksComponent           } from './dominion/rule-books/rule-books.component';
import { RandomizerComponent          } from './dominion/randomizer/randomizer.component';
import { GameResultListComponent      } from './dominion/game-result-list/game-result-list.component';
import { PlayersComponent             } from './dominion/players/players.component';
import { MyDataTableComponent } from './my-data-table/my-data-table.component';
import { PagenationComponent          } from './my-data-table/pagenation/pagenation.component';
import { ItemsPerPageComponent        } from './my-data-table/items-per-page/items-per-page.component';
import { MyLibraryService             } from './my-library.service';
import { CardListPipe                 } from './dominion/cardlist/card-list.pipe';
import { ResetButtonComponent } from './my-data-table/reset-button/reset-button.component';
import { CardPropertyDialogComponent } from './dominion/card-property-dialog/card-property-dialog.component';
import { CardImageComponent } from './dominion/card-image/card-image.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DominionComponent,
    CardlistComponent,
    RuleBooksComponent,
    RandomizerComponent,
    GameResultListComponent,
    PlayersComponent,
    MyDataTableComponent,
    PagenationComponent,
    ItemsPerPageComponent,
    CardListPipe,
    ResetButtonComponent,
    CardPropertyDialogComponent,
    CardImageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    // StickyModule,
    // MyDatePickerModule,
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
      },
      {
        path: 'dominion/randomizer',
        component: RandomizerComponent,
      },
      {
        path: 'dominion/gameresultlist',
        component: GameResultListComponent,
      },
      {
        path: 'dominion/players',
        component: PlayersComponent,
      }
    ], { useHash: true } ),
  ],
  providers: [
    { provide: 'DATA_DIR', useValue: './data' },
    { provide: 'DOMINION_DATA_DIR', useValue: './data/dominion' },
    // { provide: 'HOST_NAME', useValue: 'http://sv2.php.xdomain.ne.jp' },
    { provide: 'HOST_NAME', useValue: 'http://192.168.33.10' },
    // { provide: 'HOST_NAME', useValue: 'http://192.168.33.1' },
    // { provide: 'HOST_NAME', useValue: 'http://localhost:8000' },
    MyLibraryService,
  ],
  /* for dialog */
  entryComponents: [
    CardPropertyDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
