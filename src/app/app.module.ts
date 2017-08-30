import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopPicksComponent } from './top-picks/top-picks.component';
import { CustomPickComponent } from './custom-pick/custom-pick.component';
import { LotteryService } from './lottery.service';
import { LotteryGeneratorService } from './lottery-generator.service';
import { Fantasy5GeneratorService } from './fantasy5-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    TopPicksComponent,
    CustomPickComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [LotteryService, LotteryGeneratorService, Fantasy5GeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
