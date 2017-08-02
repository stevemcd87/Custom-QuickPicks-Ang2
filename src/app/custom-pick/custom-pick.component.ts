import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LottoNumber, LottoGame } from '../lottery';
import { CustomValidators } from '../custom-validators';
@Component({
  selector: 'app-custom-pick',
  templateUrl: './custom-pick.component.html',
  styleUrls: ['./custom-pick.component.css']
})
export class CustomPickComponent implements OnInit {
  @Input() lottoGame: LottoGame;
  name: string;
  valueName: string;
  lotteryLength: number;
  maxNumber: number;

  customFG: FormGroup;
  customArray: FormArray;
  currentLN: FormGroup;
  currentSN: FormControl;
  currentInc: FormControl;
  currentEN: FormControl;

  startMin = 1;
  incMin = 0;
  endMin = 1;

  startMax: number;
  incMax: number;
  endMax: number;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.name = this.lottoGame.name;
    this.valueName = this.lottoGame.valueName;
    this.lotteryLength = this.lottoGame.lotteryLength;
    this.maxNumber = this.lottoGame.maxNumber;
  }

  createForm() {
    this.customFG = this.fb.group({
      customLNs: this.fb.array([
        this.fb.group({
          startNumber: this.fb.control(1, CustomValidators.checkLN(this.lottoGame, 'startNumber')),
          increment: this.fb.control(1, CustomValidators.checkLN(this.lottoGame, 'increment')),
          endNumber: this.fb.control(10, CustomValidators.checkLN(this.lottoGame, 'endNumber'))
        })
      ])
    }, {
        validator: CustomValidators.checkLNgroup('customLNs', this.lottoGame)
      });
    this.customArray = this.customFG.get('customLNs') as FormArray;
    const lastIndex = this.customArray.length - 1;
    this.currentLN = this.customArray.get(`${lastIndex}`) as FormGroup;
    this.currentSN = this.currentLN.get('startNumber') as FormControl;
    this.currentInc = this.currentLN.get('increment') as FormControl;
    this.currentEN = this.currentLN.get('endNumber') as FormControl;
    this.customArray.valueChanges
      .subscribe(value => {
        // const array = value.parent;
        this.minMax(value);
        // console.log(value);
        // console.log(this.currentInc);
        // console.log(this.currentEN);
        this.currentSN.updateValueAndValidity({ onlySelf: true });
        this.currentInc.updateValueAndValidity({ onlySelf: true });
        this.currentEN.updateValueAndValidity({ onlySelf: true });
      });
  }

  minMax(array) {
    const arrayLength = array.length;
    (this.currentSN.value === this.currentEN.value) ? this.incMin = 0 : this.incMin = 1;
    this.incMax = this.currentEN.value - this.currentSN.value;
    if (arrayLength === 1) {
      this.startMin = 1;
    } else {
      const lastLN = array[arrayLength - 2];
      const lastSN = lastLN.startNumber;
      this.startMin = lastSN + 1;
    }
    this.startMax = this.currentEN.value;
    this.endMin = this.currentSN.value;
    this.endMax = this.lottoGame.maxNumber - (this.lottoGame.lotteryLength - arrayLength);
    // console.log(this.incMin);
    // console.log(this.incMax);
  }

  addLottoNumber() {

    // this.currentSN.updateValueAndValidity();
    const currentLength = this.customArray.controls.length;
    const lastLNValue = this.customArray.controls[currentLength - 1].value;
    const nextSN = lastLNValue.startNumber + 1;
    const nextEN = lastLNValue.endNumber + 1;
    this.customArray.push(this.fb.group({
      startNumber: this.fb.control(nextSN, CustomValidators.checkLN(this.lottoGame, 'startNumber')),
      increment: this.fb.control(1, CustomValidators.checkLN(this.lottoGame, 'increment')),
      endNumber: this.fb.control(nextEN, CustomValidators.checkLN(this.lottoGame, 'endNumber'))
    }));
    const lastIndex = this.customArray.length - 1;
    this.currentLN = this.customArray.get(`${lastIndex}`) as FormGroup;
    this.currentSN = this.currentLN.get('startNumber') as FormControl;
    this.currentInc = this.currentLN.get('increment') as FormControl;
    this.currentEN = this.currentLN.get('endNumber') as FormControl;

    // this.currentSN.updateValueAndValidity({ onlySelf: true });
    // this.currentInc.updateValueAndValidity({ onlySelf: true });
    // this.currentEN.updateValueAndValidity({ onlySelf: true });
  }
} // End Of Class
// , {
//         validator: CustomValidators.checkLNgroup('customLNs', this.lottoGame)
      // }