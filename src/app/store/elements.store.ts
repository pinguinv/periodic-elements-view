import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { catchError, debounceTime, distinctUntilChanged } from 'rxjs';

import { PeriodicElement } from '../types/periodic-element.type';
import { ElementsStoreState } from '../types/elements-store-state.type';

import { getElementsWithSomeDelay } from './mock-data.service';

const initialState: ElementsStoreState = {
  periodicElements: [],
  filterStr: '',
  isLoadedData: false,
};

export const PeriodicElementsStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    // Made that way to avoid using Subscription
    const debouncedFilter = toSignal(
      toObservable(store.filterStr).pipe(
        debounceTime(2000),
        distinctUntilChanged()
      ),
      { initialValue: '' }
    );

    return {
      debouncedFilter,
      filteredAndSortedElements: computed(() => {
        const sorted = store
          .periodicElements()
          .sort((a, b) => a.position - b.position);

        if (debouncedFilter() === '') return sorted;

        return sorted.filter((el) =>
          ''
            .concat(el.position.toString())
            .concat(el.name)
            .concat(el.weight.toString())
            .concat(el.symbol)
            .toLowerCase()
            .includes(debouncedFilter().toLowerCase())
        );
      }),
    };
  }),
  withMethods((store) => ({
    updateElement(updatedElement: PeriodicElement) {
      patchState(store, {
        periodicElements: store.periodicElements().map((element) => {
          if (element.id === updatedElement.id) {
            return updatedElement;
          }
          return element;
        }),
      });
    },
    updateFilter(filterStr: string) {
      patchState(store, {
        filterStr: filterStr,
      });
    },
  })),
  withHooks({
    onInit(store) {
      const sub = getElementsWithSomeDelay()
        .pipe(
          catchError((err) => {
            console.error(err);
            return [];
          })
        )
        .subscribe((data: PeriodicElement[]) => {
          // Assign id's when data is here.
          // Why?
          // I don't know if im allowed to change initial data that I got
          // (I assumed not)
          // - and there is no id's and positions can not act as id
          // because it must be able to be changed
          for (let i = 0; i < data.length; i++) data[i].id = i;

          patchState(store, { periodicElements: data, isLoadedData: true });

          sub.unsubscribe();
        });
    },
  })
);
