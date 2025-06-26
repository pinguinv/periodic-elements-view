import { PeriodicElement } from './periodic-element.type';

export type ElementsStoreState = {
  periodicElements: PeriodicElement[];
  filterStr: string;
  isLoadedData: boolean;
};
