import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopPicksComponent } from './top-picks/top-picks.component';
import { CustomPickComponent } from './custom-pick/custom-pick.component';
import { LotteryService } from './lottery.service';
import { LotteryGeneratorService } from './lottery-generator.service';
import { Fantasy5GeneratorService } from './fantasy5-generator.service';
import { Compare2HistoryComponent } from './compare-2-history/compare-2-history.component';
import { List2HistoryPipe } from './list-2-history.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopPicksComponent,
    CustomPickComponent,
    Compare2HistoryComponent,
    List2HistoryPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [LotteryService, LotteryGeneratorService, Fantasy5GeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
