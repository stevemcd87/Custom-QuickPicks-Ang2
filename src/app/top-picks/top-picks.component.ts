import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomPickComponent } from '../custom-pick/custom-pick.component';
import { Compare2HistoryComponent } from '../compare-2-history/compare-2-history.component';

import { LotteryService } from '../lottery.service';
import { LottoGame, LottoNumber, LottoOption, LottoList } from '../lottery';
import { CValidators } from '../custom-validators';
@Component({
  selector: 'app-top-picks',
  // templateUrl: './top-picks.component.html',
  template: `
<form [formGroup]="topPicksForm">
  <input type="radio" formControlName="topPickOptions" value="0">First Pick
  <input type="radio" formControlName="topPickOptions" value="1"> Second Pick
  <input type="radio" formControlName="topPickOptions" value="custom"> Custom
  <button *ngIf="topPicksForm.valid " type="button">next step </button>
  <app-custom-pick *ngIf="customLotto " [lG]="lG" (llGenerated)="LLgen($event)"></app-custom-pick>
   <app-compare-2-history *ngIf="customFinished" [lG]="lG" [lottoList]="lottoList" ></app-compare-2-history>
</form>`,
  styleUrls: ['./top-picks.component.css']
})

export class TopPicksComponent implements OnInit {
  @Input() lG: LottoGame;
  @Input() lottoList: LottoList[] = [];
  valueName: string;

  topPicksForm: FormGroup;
  topPickOptionsControls: FormControl;
  selectedTP: LottoOption;
  customLotto = false;
  customFinished = false;

  constructor(private fb: FormBuilder, private ls: LotteryService) { }

  ngOnInit() {
    this.createForm();
    this.valueName = this.lG.valueName;
  }

  createForm() {
    this.topPicksForm = this.fb.group({
      topPickOptions: this.fb.control(null)
    }, {
        validator: CValidators.checkTP('topPickOptions', this.lottoList)
      });
    this.topPickOptionsControls = this.topPicksForm.get('topPickOptions') as FormControl;
    this.topPickOptionsControls.valueChanges
      .subscribe(value => {
        Number(value);
        console.log(value);
        if (value < 2) {
          this.ls.getPickOptions(this.valueName, value).then(LNs => {
            this.selectedTP = LNs;
            this.customLotto = false;
            console.log(this.selectedTP);
          });
        } else {
          this.customLotto = true;
        }
      });
  }

  LLgen(lotteryList) {
    Promise.resolve(this.lottoList = lotteryList).then((res) => {
      console.log(res);
      this.customFinished = true;
      // this.topPicksForm.updateValueAndValidity({ onlySelf: true });
    });
  }


} // End of Class
