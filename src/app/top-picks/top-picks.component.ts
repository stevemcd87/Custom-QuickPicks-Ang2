import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { LotteryService } from '../lottery.service';
import { LottoGame } from '../lottery';

@Component({
  selector: 'app-top-picks',
  templateUrl: './top-picks.component.html',
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

  constructor(private fb: FormBuilder) { }

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
      .subscribe(value => value);
  } // End of CreateForm()
}
