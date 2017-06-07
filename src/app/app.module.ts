import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule,
         MdIconModule,
         MdIconRegistry, 
         MdDatepickerModule,
         MdNativeDateModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // md-tab
import 'hammerjs';

// import { UiSwitchModule } from 'angular2-ui-switch';

// import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent                 } from './app.component';
import { MyLibraryService             } from './my-library.service';
import { MyDataTableComponent         } from './my-data-table/my-data-table.component';
import { PagenationComponent          } from './my-data-table/pagenation/pagenation.component';
import { ItemsPerPageComponent        } from './my-data-table/items-per-page/items-per-page.component';
import { ResetButtonComponent         } from './my-data-table/reset-button/reset-button.component';

import { HomeComponent                } from './home/home.component';
import { DominionComponent            } from './dominion/dominion.component';
import { RuleBooksComponent           } from './dominion/rule-books/rule-books.component';
import { RandomizerComponent          } from './dominion/randomizer/randomizer.component';
import { GameResultListComponent      } from './dominion/game-result-list/game-result-list.component';
import { PlayersComponent             } from './dominion/players/players.component';
import { CardlistComponent            } from './dominion/cardlist/cardlist.component';
import { CardPropertyDialogComponent  } from './dominion/card-property-dialog/card-property-dialog.component';
import { CardImageComponent           } from './dominion/card-image/card-image.component';
import { AddGameResultComponent       } from './dominion/randomizer/add-game-result/add-game-result.component';
import { SubmitGameResultDialogComponent } from './dominion/submit-game-result-dialog/submit-game-result-dialog.component';
import { TableBodyComponent } from './my-data-table/table-body/table-body.component';
import { MyWaitingSpinnerComponent } from './my-waiting-spinner/my-waiting-spinner.component';


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
        ResetButtonComponent,
        CardPropertyDialogComponent,
        CardImageComponent,
        AddGameResultComponent,
        SubmitGameResultDialogComponent,
        TableBodyComponent,
        MyWaitingSpinnerComponent,
    ],
    imports: [
        // UiSwitchModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        MdDatepickerModule,
        MdNativeDateModule,
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
        { provide: 'HOST_NAME', useValue: 'http://dominion.piko-apps.info/' },
        // { provide: 'HOST_NAME', useValue: 'http://192.168.33.10' },
        // { provide: 'HOST_NAME', useValue: 'http://192.168.33.1' },
        // { provide: 'HOST_NAME', useValue: 'http://localhost:8000' },
        MyLibraryService,
    ],
    /* for dialog */
    entryComponents: [
        CardPropertyDialogComponent,
        SubmitGameResultDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
