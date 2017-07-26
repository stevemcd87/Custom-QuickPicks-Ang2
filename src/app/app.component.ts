import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TopPicksComponent } from './top-picks/top-picks.component';
import { LottoGame } from './lottery';
import { LotteryService } from './lottery.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <h1>{{title}}</h1>
<div *ngIf="step > 1">
  <button type="button" (click)="step = 1">Back to Step 1</button>
</div>
<form *ngIf="step === 1" [formGroup]="appForm">
  <input type="radio" formControlName="lotteryGameOptions" value="0">Fantasy 5
  <input type="radio" formControlName="lotteryGameOptions" value="1"> Florida Lotto
  <button type="button" (click)="onSelect(lotteryGameOptionsControls.value)">next step </button>
</form>
<app-top-picks *ngIf="step > 1" [lottoGame]="selectedLG"></app-top-picks>
`,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  step = 1;
  appForm: FormGroup;
  lotteryGameOptionsControls: FormControl;
  lottoGames: LottoGame[];
  selectedLG: LottoGame;
  title = 'Lotto Quick Picks';

  constructor(private fb: FormBuilder, private ls: LotteryService) { }

  ngOnInit() {
    this.getLottoGames();
    this.createForm();
  }
  createForm() {
    this.appForm = this.fb.group({
      lotteryGameOptions: this.fb.control(null)
    });
    this.lotteryGameOptionsControls = this.appForm.get('lotteryGameOptions') as FormControl;
    this.lotteryGameOptionsControls.valueChanges
      .subscribe(value => value);
  } // End of CreateForm()
  getLottoGames() {
    this.ls.getLottoGames().then(LGs => this.lottoGames = LGs);
  }
  onSelect(value: string): void {
    this.selectedLG = this.ls.onSelect(value);
    this.step = this.ls.stepPlusOne(this.step);
    console.log(this.selectedLG);
  }
}// End of Class
