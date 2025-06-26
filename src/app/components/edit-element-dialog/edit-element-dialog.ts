import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PeriodicElement } from '../../types/periodic-element.type';
import { PeriodicElementsStore } from '../../store/elements.store';

@Component({
  selector: 'app-edit-element-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [PeriodicElementsStore],
  templateUrl: './edit-element-dialog.html',
  styleUrl: './edit-element-dialog.scss',
})
export class EditElementDialog {
  dialogRef = inject(MatDialogRef<EditElementDialog>);
  elementData: PeriodicElement = inject(MAT_DIALOG_DATA);
  store = inject(PeriodicElementsStore);

  position = this.elementData.position;
  name = this.elementData.name;
  weight = this.elementData.weight;
  symbol = this.elementData.symbol;

  saveElement() {
    const updatedElement: PeriodicElement = {
      position: this.position,
      name: this.name,
      weight: this.weight,
      symbol: this.symbol,
    };

    this.dialogRef.close(updatedElement);
  }
}
