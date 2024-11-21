import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Countries List',
  },
  {
    path: 'new',
    component: AddCountryComponent,
    title: 'Add Country',
  },
  {
    path: 'edit',
    component: EditCountryComponent,
    title: 'Edit Country',
  },
];
