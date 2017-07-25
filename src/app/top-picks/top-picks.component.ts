import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { LotteryService } from '../lottery.service';
import { LottoGame, LottoNumber } from '../lottery';

@Component({
  selector: 'app-top-picks',
  // templateUrl: './top-picks.component.html',
  template: `
<p>  top-picks works! </p>
<form [formGroup]="topPicksForm">
  <input type="radio" formControlName="topPickOptions" value="0">First Pick
  <input type="radio" formControlName="topPickOptions" value="1"> Second Pick
  <input type="radio" formControlName="topPickOptions" value="2"> Custom
  <button type="button" (click)="ls.stepPlusOne(step)">next step </button>
</form>`,
  styleUrls: ['./top-picks.component.css']
})
export class TopPicksComponent implements OnInit {
  @Input() lottoGame: LottoGame;
  id: number;
  name: string;
  valueName: string;
  lotteryLength: number;
  maxNumber: number;


  topPicksForm: FormGroup;
  topPickOptionsControls: FormControl;
  selectedTP: LottoNumber[];

  constructor(private fb: FormBuilder, private ls: LotteryService) { }

  ngOnInit() {
    this.createForm();
    this.id = this.lottoGame.id;
    this.name = this.lottoGame.name;
    this.valueName = this.lottoGame.valueName;
    this.lotteryLength = this.lottoGame.lotteryLength;
    this.maxNumber = this.lottoGame.maxNumber;
  }


  createForm() {
    this.topPicksForm = this.fb.group({
      topPickOptions: this.fb.control(null)
    });
    this.topPickOptionsControls = this.topPicksForm.get('topPickOptions') as FormControl;
    this.topPickOptionsControls.valueChanges
      .subscribe(value => {
        this.ls.getPickOptions(this.valueName, value).then(LNs => {
          this.selectedTP = LNs;
          console.log(this.selectedTP);
        });
      });
  } // End of CreateForm()
}
