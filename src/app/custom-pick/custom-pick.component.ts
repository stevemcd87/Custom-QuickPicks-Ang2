import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-pick',
  templateUrl: './custom-pick.component.html',
  styleUrls: ['./custom-pick.component.css']
})
export class CustomPickComponent implements OnInit {
  customForm: FormArray;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    console.log('created custom form');
  }

}
