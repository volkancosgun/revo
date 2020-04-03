import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface UpdateNotes {
  id: number;
  title: string;
  msg: string;
}

@Component({
  selector: 'vex-update-notes-dialog',
  templateUrl: './update-notes-dialog.component.html',
  styleUrls: ['./update-notes-dialog.component.scss']
})
export class UpdateNotesDialogComponent implements OnInit {

  _appVersion = environment.version;
  notes: UpdateNotes[];

  constructor(
    public dialogRef: MatDialogRef<UpdateNotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateNotes[]
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateConfirm(): void {

    localStorage.setItem('app_version', this._appVersion);
    this.dialogRef.close();

  }

  ngOnInit() {

    this.notes = this.data;

  }

}
