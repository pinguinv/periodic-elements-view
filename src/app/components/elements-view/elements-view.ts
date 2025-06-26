import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CdkCellOutlet } from '@angular/cdk/table';

import { EditElementDialog } from '../edit-element-dialog/edit-element-dialog';
import { PeriodicElementsStore } from '../../store/elements.store';
import { PeriodicElement } from '../../types/periodic-element.type';

@Component({
  selector: 'app-elements-view',
  imports: [
    CommonModule,
    CdkCellOutlet,
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

  openEditElementDialog(element: PeriodicElement, index: number) {
    const configData: MatDialogConfig = {
      data: element,
    };

    const dialogRef = this.dialog.open(EditElementDialog, configData);

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        this.periodicElementStore.updateElementByIndex(index, updatedData);
      }
    });
  }
}
