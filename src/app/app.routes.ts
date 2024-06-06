import { Routes } from '@angular/router';
import { SignalsVsSubjectsComponent } from './components/signals-vs-subjects/signals-vs-subjects.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signals-vs-subjects', component: SignalsVsSubjectsComponent }
];
