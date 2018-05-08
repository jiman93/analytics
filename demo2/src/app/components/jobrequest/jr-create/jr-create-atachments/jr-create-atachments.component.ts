import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-jr-create-atachments',
  templateUrl: './jr-create-atachments.component.html',
  styleUrls: ['./jr-create-atachments.component.css']
})
export class JrCreateAtachmentsComponent implements OnInit {

  @Input('reqForm') reqForm: FormGroup;
  private attachments: FormArray;
  private jobInstruction: FormGroup;
  private selectedAttachmentIndex = -1;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.attachments = <FormArray>this.reqForm.controls.attachments;
    this.jobInstruction = <FormGroup>this.reqForm.controls.jobInstruction;
  }

  initAttachment() {
    return this._fb.group({
      filename: ['', Validators.required],
      title: ['', Validators.required],
      url: []
    });
  }

  addAttachment() {
    this.attachments.push(this.initAttachment());
  }

  deleteAttachment() {
    this.attachments.removeAt(this.selectedAttachmentIndex);
    this.selectedAttachmentIndex = -1
  }

  onSelectAttachment(index) {
    this.selectedAttachmentIndex = index;
    /*
      if(this.selectedAttachmentIndex!== -1 && this.selectedAttachmentIndex=== index){
        this.selectedAttachmentIndex=-1;
      }else{
        this.selectedAttachmentIndex=index;
      }
      */
  }
  loadFile(e, index) {
    console.log('file');
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.attachments.controls[index].patchValue({ 'filename': file.name });
  }

}
