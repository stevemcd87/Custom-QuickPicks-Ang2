import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TopPicksComponent } from './top-picks/top-picks.component';
import { LottoGame } from './lottery';
import { LotteryService } from './lottery.service';

const LOTTOGAMES: LottoGame[] = [
  {
    id: 0,
    name: 'Fantasy 5',
    valueName: 'fantasy5',
    lotteryLength: 5,
    maxNumber: 36
  },
  {
    id: 1,
    name: 'Florida Lotto',
    valueName: 'floridaLotto',
    lotteryLength: 6,
    maxNumber: 40
  }
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  step = 1;
  appForm: FormGroup;
  lotteryGameOptionsControls: FormControl;
  selectedLG: LottoGame;


  lottoGames = LOTTOGAMES;


  title = 'Lotto Quick Picks';
  constructor(private fb: FormBuilder, private ls: LotteryService) { }
  ngOnInit() {

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
  onSelect(value: string): void {
    Number(value);
    this.selectedLG = LOTTOGAMES[value];
    this.step = this.ls.stepPlusOne(this.step);
  }


}
