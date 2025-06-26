import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';

import { PeriodicElement } from '../types/periodic-element.type';
import { ElementsStoreState } from '../types/elements-store-state.type';

import { getElementsWithSomeDelay } from './mock-data.service';
import { catchError } from 'rxjs';

const initialState: ElementsStoreState = {
  periodicElements: [],
  isLoadedData: false,
};

export const PeriodicElementsStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    sortedElements: computed(() => {
      return store.periodicElements().sort((a, b) => a.position - b.position);
    }),
  })),
  withMethods((store) => ({
    updateElementByIndex(index: number, updatedElement: PeriodicElement) {
      patchState(store, {
        periodicElements: store.periodicElements().map((element, elIndex) => {
          if (elIndex === index) {
            return updatedElement;
          }
          return element;
        }),
      });
    },
  })),
  withHooks({
    onInit(store) {
      getElementsWithSomeDelay()
        .pipe(
          catchError((err) => {
            console.error(err);
            return [];
          })
        )
        .subscribe((data: PeriodicElement[]) => {
          patchState(store, { periodicElements: data, isLoadedData: true });
        });
    },
  })
);
