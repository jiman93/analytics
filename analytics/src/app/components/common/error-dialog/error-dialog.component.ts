import { Component, Inject, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log ("ErrorDialogComponent()", data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
