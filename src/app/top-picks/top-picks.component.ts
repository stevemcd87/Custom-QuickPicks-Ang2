import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomPickComponent } from '../custom-pick/custom-pick.component';
import { LotteryService } from '../lottery.service';
import { LottoGame, LottoNumber, LottoOption } from '../lottery';
import { CustomValidators } from '../custom-validators';
@Component({
  selector: 'app-top-picks',
  // templateUrl: './top-picks.component.html',
  template: `
<p>  top-picks works! </p>
<form [formGroup]="topPicksForm">
  <input type="radio" formControlName="topPickOptions" value="0">First Pick
  <input type="radio" formControlName="topPickOptions" value="1"> Second Pick
  <input type="radio" formControlName="topPickOptions" value="custom"> Custom
  <button *ngIf="topPicksForm.valid" type="button">next step </button>
  <app-custom-pick *ngIf="customLotto === true" [lottoGame]="lottoGame"></app-custom-pick>
</form>`,
  styleUrls: ['./top-picks.component.css']
})
export class TopPicksComponent implements OnInit {
  @Input() lottoGame: LottoGame;
  valueName: string;

  topPicksForm: FormGroup;
  topPickOptionsControls: FormControl;
  selectedTP: LottoOption;
  customLotto = false;

  constructor(private fb: FormBuilder, private ls: LotteryService) { }

  ngOnInit() {
    this.createForm();
    this.valueName = this.lottoGame.valueName;
  }

  createForm() {
    this.topPicksForm = this.fb.group({
      topPickOptions: this.fb.control(null)
    }, {
        validator: CustomValidators.checkTP('topPickOptions')
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
} // End of Class
