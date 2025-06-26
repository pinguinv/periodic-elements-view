import { Route } from '@angular/router';
import { PeriodicElementsView } from './components/elements-view/elements-view';

export const appRoutes: Route[] = [
  {
    path: '',
    component: PeriodicElementsView,
  },
  { path: '**', redirectTo: '' },
];
