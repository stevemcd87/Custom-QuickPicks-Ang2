import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LottoNumber, LottoGame } from '../lottery';
import { CValidators } from '../custom-validators';
import { LotteryGeneratorService } from '../lottery-generator.service';


@Component({
  selector: 'app-custom-pick',
  templateUrl: './custom-pick.component.html',
  styleUrls: ['./custom-pick.component.css']
})
export class CustomPickComponent implements OnInit {
  @Input() lG: LottoGame;
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

  showRulesSN = false;
  showRulesInc = false;
  showRulesEN = false;

  lottoList: number[][];

  constructor(private fb: FormBuilder,
    private lgs: LotteryGeneratorService) { }

  ngOnInit() {
    this.makePromise(this.createForm()).then(() => {
      this.minMax(this.customArray.value);
    });
    this.name = this.lG.name;
    this.valueName = this.lG.valueName;
    this.lotteryLength = this.lG.lotteryLength;
    this.maxNumber = this.lG.maxNumber;
  }

  makePromise(method) {
    return Promise.resolve(method);
  }

  createForm() {
    console.log('creating Form');
    this.customFG = this.fb.group({
      customLNs: this.fb.array([
        this.fb.group({
          startNumber: this.fb.control(1, [CValidators.LNmax(this.lG, 'startNumber'), CValidators.LNmin(this.lG, 'startNumber')]),
          increment: this.fb.control(1, [CValidators.LNmax(this.lG, 'increment'), CValidators.LNmin(this.lG, 'increment')]),
          endNumber: this.fb.control(10, [CValidators.LNmax(this.lG, 'endNumber'), CValidators.LNmin(this.lG, 'endNumber')])
        })
      ])
    });
    this.customArray = this.customFG.get('customLNs') as FormArray;
    const lastIndex = this.customArray.length - 1;
    this.currentLN = this.customArray.get(`${lastIndex}`) as FormGroup;
    this.currentSN = this.currentLN.get('startNumber') as FormControl;
    this.currentInc = this.currentLN.get('increment') as FormControl;
    this.currentEN = this.currentLN.get('endNumber') as FormControl;
    this.customArray.valueChanges
      .subscribe(value => {
        console.log('subscibe()');
        this.makePromise(this.minMax(value)).then(res => {
          this.currentSN.updateValueAndValidity({ onlySelf: true });
          this.currentEN.updateValueAndValidity({ onlySelf: true });
          this.currentInc.updateValueAndValidity({ onlySelf: true });
          this.minMax(value);
        });
      });
  }

  minMax(array) {
    const arrayLength = array.length;
    let lastLN;
    let lastSN;
    // Start Number Min
    if (arrayLength === 1) {
      this.startMin = 1;
    } else {
      lastLN = array[arrayLength - 2];
      lastSN = lastLN.startNumber;
      this.startMin = lastSN + 1;
    }
    // Start Number Max
    if (this.currentEN.value === null || this.currentEN.value > this.endMax) {
      this.startMax = this.lG.maxNumber - (this.lG.lotteryLength - arrayLength);
    } else {
      this.startMax = this.currentEN.value;
      console.log(this.currentEN.value);
    }
    // End Number Min
    if (this.currentSN.value === null) {
      this.endMin = this.startMin;
    } else {
      this.endMin = this.currentSN.value;
    }
    // End Number Max
    this.endMax = this.lG.maxNumber - (this.lG.lotteryLength - arrayLength);
    // Increment
    if (this.currentSN.invalid || this.currentEN.invalid) {
      this.incMin = null;
      this.incMax = null;
    } else {
      // Increment Min
      (this.currentSN.value === this.currentEN.value) ? this.incMin = 0 : this.incMin = 1;
      // Increment Max
      this.incMax = this.currentEN.value - this.currentSN.value;
    }
    // For debugging Purposes
    console.log('minMax()');
    console.log('startMin - ' + this.startMin);
    console.log('startMax - ' + this.startMax);
    console.log('incMin - ' + this.incMin);
    console.log('incMax - ' + this.incMax);
    console.log('endMin - ' + this.endMin);
    console.log('endMax - ' + this.endMax);
  }

  addLottoNumber() {
    console.log('addLottoNumber()');
    this.makePromise(this.pushLN()).then(() => {
      this.minMax(this.customArray.value);
    });
  }

  pushLN() {
    const currentLength = this.customArray.controls.length;
    const lastLNValue = this.customArray.controls[currentLength - 1].value;
    const nextSN = lastLNValue.startNumber + 1;


    const nextEN = lastLNValue.endNumber + 1;
    let nextInc: number;
    (nextSN === nextEN) ? nextInc = 0 : nextInc = 1;
    this.customArray.push(this.fb.group({
      startNumber: this.fb.control(nextSN, [CValidators.LNmax(this.lG, 'startNumber'), CValidators.LNmin(this.lG, 'startNumber')]),
      increment: this.fb.control(nextInc, [CValidators.LNmax(this.lG, 'increment'), CValidators.LNmin(this.lG, 'increment')]),
      endNumber: this.fb.control(nextEN, [CValidators.LNmax(this.lG, 'endNumber'), CValidators.LNmin(this.lG, 'endNumber')])
    }));
    const lastIndex = this.customArray.length - 1;
    this.currentLN = this.customArray.get(`${lastIndex}`) as FormGroup;
    this.currentSN = this.currentLN.get('startNumber') as FormControl;
    this.currentInc = this.currentLN.get('increment') as FormControl;
    this.currentEN = this.currentLN.get('endNumber') as FormControl;
  }

  toggleShowRules(name: string, boolean: boolean) {
    boolean = !boolean;
    switch (name) {
      case 'srsn': this.showRulesSN = boolean;
        break;
      case 'sri': this.showRulesInc = boolean;
        break;
      case 'sren': this.showRulesEN = boolean;
        break;
    }
    return boolean;
  }

  genLN() {
    console.log('GenLN()');
    this.lottoList = this.lgs.genLottoArgs(this.customArray.value);
    console.log(this.lottoList);
  }
} // End Of Class
