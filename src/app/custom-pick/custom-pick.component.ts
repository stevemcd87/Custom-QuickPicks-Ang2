import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { LottoNumber } from '../lottery';
@Component({
  selector: 'app-custom-pick',
  templateUrl: './custom-pick.component.html',
  styleUrls: ['./custom-pick.component.css']
})
export class CustomPickComponent implements OnInit {

  customFG: FormGroup;
  customArray: FormArray;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
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

    console.log(lastLNValue);
  }


} // End Of Class
