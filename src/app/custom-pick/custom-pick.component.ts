import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { LottoNumber, LottoGame } from '../lottery';
@Component({
  selector: 'app-custom-pick',
  templateUrl: './custom-pick.component.html',
  styleUrls: ['./custom-pick.component.css']
})
export class CustomPickComponent implements OnInit {
  @Input() lottoGame: LottoGame;
  id: number;
  name: string;
  valueName: string;
  lotteryLength: number;
  maxNumber: number;
  customFG: FormGroup;
  customArray: FormArray;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();

    this.id = this.lottoGame.id;
    this.name = this.lottoGame.name;
    this.valueName = this.lottoGame.valueName;
    this.lotteryLength = this.lottoGame.lotteryLength;
    this.maxNumber = this.lottoGame.maxNumber;
    console.log(this.id);
    console.log(this.name);
    console.log(this.valueName);
    console.log(this.lotteryLength);
    console.log(this.maxNumber);
  }

  createForm() {
    this.customFG = this.fb.group({
      customLNs: this.fb.array([
        this.fb.group({
          startNumber: this.fb.control(1),
          increment: this.fb.control(1),
          endNumber: this.fb.control(10)
        })
      ])
    });
    this.customArray = this.customFG.get('customLNs') as FormArray;
  }

  addLottoNumber() {
    const currentLength = this.customArray.controls.length;
    const lastLNValue = this.customArray.controls[currentLength - 1].value;
    const nextSN = lastLNValue.startNumber + 1;
    const nextEN = lastLNValue.endNumber + 1;
    this.customArray.push(this.fb.group({
      startNumber: this.fb.control(nextSN),
      increment: this.fb.control(1),
      endNumber: this.fb.control(nextEN)
    }));
    console.log(this.customArray.value);
  }
} // End Of Class
