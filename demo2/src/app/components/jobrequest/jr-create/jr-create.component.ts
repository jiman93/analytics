import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jr-create',
  templateUrl: './jr-create.component.html',
  styleUrls: ['./jr-create.component.css']
})
export class JrCreateComponent implements OnInit {
  private jobRequestForm:FormGroup;
  private jsonData = {};
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.jobRequestForm = this._fb.group({
            main: this._fb.group({
                jobRequestId: ['', []],
                faciityCode:['', []],
                jobReqStatus: ['', []], // internal
                shipId: ['', [Validators.required]],
                title: ['', [Validators.required]],
                description: ['', [Validators.required]],
                dateRequested: ['', [Validators.required]],
                dateRaised: ['', [Validators.required]],
                priority: ['', [Validators.required]],
                activity: ['', [Validators.required]],
                type: ['', [Validators.required]],
                fromSection: ['', [Validators.required]],
                toSection: ['', [Validators.required]],
                equipmentStatus: ['', [Validators.required]],
                shipStatus: ['', [Validators.required]],
                shipClass: ['', [Validators.required]],
                requestor: ['', [Validators.required]],
                location: this._fb.group({
                    facilityCode: ['', [Validators.required]],
                    name: ['', [Validators.required]],
                    alias: ['', [Validators.required]],
                }),
            }),
            properties: this._fb.array([]),
            jobInstruction: this._fb.group({
                extraInstruction: ['', [Validators.required]]
            }),
            attachments: this._fb.array([])
        });
      this.jobRequestForm.controls.main.patchValue({'priority':10,
                  type:10,activity:10,fromSection:10,
                  toSection:10,requestor:10,shipStatus:10,shipCategory:10,
                  equipmentStatus:10,shipClass:10,dateRaised:'2018-03-20',dateRequested:'2018-04-20'
                });
                
  }

onStepChange($event) {
    console.log("onStepChange", $event);
    switch ($event.selectedIndex) {
      case 0:
        console.log('step 0');
        break;
      case 1:
        console.log('step 1');
        break;
      case 2:
        console.log('step 2');
        var requestFormData = this.jobRequestForm.getRawValue();
        var createOrderReq = {
          type: "JOB-REQUEST.Add",
          submitResourceAction: requestFormData.main
        };
        
        this.jsonData=createOrderReq;
        break;

    }
  }
}
