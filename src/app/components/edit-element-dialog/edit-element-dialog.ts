import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PeriodicElement } from '../../types/periodic-element.type';
import { integerOnlyValidator } from '../../shared/integer-only.directive';

@Component({
  selector: 'app-edit-element-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-element-dialog.html',
  styleUrl: './edit-element-dialog.scss',
})
export class EditElementDialog {
  dialogRef = inject(MatDialogRef<EditElementDialog>);
  elementData: PeriodicElement = inject(MAT_DIALOG_DATA);

  editElementForm = new FormGroup({
    position: new FormControl(this.elementData.position, [
      Validators.required,
      integerOnlyValidator(),
    ]),
    name: new FormControl(this.elementData.name, [Validators.required]),
    weight: new FormControl(this.elementData.weight, [Validators.required]),
    symbol: new FormControl(this.elementData.symbol, [Validators.required]),
  });

  constructor() {
    this.editElementForm.markAllAsTouched();
  }

  saveElement(): void {
    if (this.editElementForm.invalid) return;

    const updatedElement: PeriodicElement = {
      position: this.editElementForm.controls.position.value,
      name: this.editElementForm.controls.name.value,
      weight: this.editElementForm.controls.weight.value,
      symbol: this.editElementForm.controls.symbol.value,
      id: this.elementData.id,
    };

    this.dialogRef.close(updatedElement);
  }
}
