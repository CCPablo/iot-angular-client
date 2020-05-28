import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  user: string
}

@Component({
  templateUrl: './profile-sheet.component.html',
})
export class ProfileSheetComponent {

  constructor(
    public dialogRef: MatDialogRef<ProfileSheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
