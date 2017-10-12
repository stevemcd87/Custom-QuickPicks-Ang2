import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TopPicksComponent } from './top-picks/top-picks.component';
import { LottoGame, LottoList } from './lottery';
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
  <button *ngIf="lottoGameControls.valid" type="button" (click)="onSelect(lottoGameControls.value)">next step </button>
</form>
<app-top-picks *ngIf="step === 2" [lG]="selectedLG"></app-top-picks>

`,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  step = 1;
  appForm: FormGroup;
  lottoGameControls: FormControl;
  lottoGames: LottoGame[];
  selectedLG: LottoGame;
  title = 'Lotto Quick Picks';
  lottoList: LottoList[];

  constructor(private fb: FormBuilder, private ls: LotteryService) { }

  ngOnInit() {
    this.getLottoGames();
    this.createForm();
  }
  createForm() {
    this.appForm = this.fb.group({
      lotteryGameOptions: this.fb.control(null, Validators.required)
    });
    this.lottoGameControls = this.appForm.get('lotteryGameOptions') as FormControl;
    this.lottoGameControls.valueChanges
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
