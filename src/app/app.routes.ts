import { Routes } from '@angular/router';
import { SignalStoreComponent } from './components/signal-store/signal-store.component';
import { SignalsVsSubjectsComponent } from './components/signals-vs-subjects/signals-vs-subjects.component';

export const routes: Routes = [
    { path: 'signals-vs-subjects', component: SignalsVsSubjectsComponent },
    { path: 'signal-store', component: SignalStoreComponent }
];
