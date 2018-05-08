import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jr-create-details',
  templateUrl: './jr-create-details.component.html',
  styleUrls: ['./jr-create-details.component.css']
})
export class JrCreateDetailsComponent implements OnInit {
  @Input('reqForm') reqForm: FormGroup;
  public jobMain: FormGroup;
  constructor() { }

  ngOnInit() {
    this.jobMain = <FormGroup>this.reqForm.controls.main;
  }

}
