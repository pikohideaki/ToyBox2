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

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { AppComponent                    } from './app.component';
import { MyLibraryService                } from './my-library.service';
import { MyDataTableComponent            } from './my-data-table/my-data-table.component';
import { PagenationComponent             } from './my-data-table/pagenation/pagenation.component';
import { ItemsPerPageComponent           } from './my-data-table/items-per-page/items-per-page.component';
import { ResetButtonComponent            } from './my-data-table/reset-button/reset-button.component';

import { MyWaitingSpinnerComponent       } from './my-waiting-spinner/my-waiting-spinner.component';

import { HomeComponent                   } from './home/home.component';
import { DominionComponent               } from './dominion/dominion.component';
import { RuleBooksComponent              } from './dominion/rule-books/rule-books.component';
import { RandomizerComponent             } from './dominion/randomizer/randomizer.component';
import { GameResultComponent             } from './dominion/game-result/game-result.component';
import { GameResultListComponent         } from './dominion/game-result/game-result-list/game-result-list.component';
import { PlayersComponent                } from './dominion/players/players.component';
import { CardlistComponent               } from './dominion/cardlist/cardlist.component';
import { CardPropertyDialogComponent     } from './dominion/card-property-dialog/card-property-dialog.component';
import { DominionCardImageComponent      } from './dominion/dominion-card-image/dominion-card-image.component';
import { AddGameResultComponent          } from './dominion/randomizer/add-game-result/add-game-result.component';
import { SubmitGameResultDialogComponent } from './dominion/submit-game-result-dialog/submit-game-result-dialog.component';
import { GameResultOfPlayerComponent     } from './dominion/game-result/game-result-of-player/game-result-of-player.component';
import { ScoringService                  } from './dominion/http-scoring.service';
import { RandomizerCardImageComponent } from './dominion/randomizer/randomizer-card-image/randomizer-card-image.component';
import { AppListComponent } from './app-list/app-list.component';
import { LocalGameGroupsComponent } from './dominion/randomizer/local-game-groups/local-game-groups.component';


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
        DominionCardImageComponent ,
        AddGameResultComponent,
        SubmitGameResultDialogComponent,
        MyWaitingSpinnerComponent,
        GameResultComponent,
        GameResultOfPlayerComponent,
        RandomizerCardImageComponent,
        AppListComponent,
        LocalGameGroupsComponent,
    ],
    imports: [
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
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        // AngularFireDatabaseModule, // imports firebase/database, only needed for database features
        // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
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
                path: 'dominion/gameresult',
                component: GameResultComponent,
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
        ScoringService,
    ],
    /* for dialog, snackbar */
    entryComponents: [
        CardPropertyDialogComponent,
        SubmitGameResultDialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
