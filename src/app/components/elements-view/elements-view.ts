import { Component, effect, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { CdkCellOutlet } from '@angular/cdk/table';

import { EditElementDialog } from '../edit-element-dialog/edit-element-dialog';
import { PeriodicElementsStore } from '../../store/elements.store';
import { PeriodicElement } from '../../types/periodic-element.type';

@Component({
  selector: 'app-elements-view',
  imports: [
    CommonModule,
    CdkCellOutlet,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatRippleModule,
    MatProgressSpinnerModule,
  ],
  providers: [PeriodicElementsStore],
  templateUrl: './elements-view.html',
  styleUrl: './elements-view.scss',
})
export class PeriodicElementsView {
  readonly periodicElementStore = inject(PeriodicElementsStore);
  readonly dialog = inject(MatDialog);

  protected displayedColumns: string[] = ['Number', 'Name', 'Weight', 'Symbol'];

  filter = model<string>('');

  constructor() {
    effect(() => {
      this.periodicElementStore.updateFilter(this.filter());
    });
  }

  openEditElementDialog(element: PeriodicElement) {
    const configData: MatDialogConfig = {
      data: element,
    };

    const dialogRef = this.dialog.open(EditElementDialog, configData);

    const sub = dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        this.periodicElementStore.updateElement(updatedData);
      }

      sub.unsubscribe();
    });
  }
}
