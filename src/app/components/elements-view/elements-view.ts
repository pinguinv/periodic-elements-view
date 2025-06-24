import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { PeriodicElementsStore } from '../../store/elements.store';
import { PeriodicElement } from '../../types/periodic-element.type';

@Component({
  selector: 'app-elements-view',
  imports: [CommonModule, MatTableModule],
  providers: [PeriodicElementsStore],
  templateUrl: './elements-view.html',
  styleUrl: './elements-view.scss',
})
export class PeriodicElementsView {
  readonly periodicElementStore = inject(PeriodicElementsStore);
  protected displayedColumns: string[] = ['Number', 'Name', 'Weight', 'Symbol'];

  constructor() {
    console.log(this.periodicElementStore.periodicElements());
  }

  logElement(element: PeriodicElement) {
    console.log(element);
  }
}
