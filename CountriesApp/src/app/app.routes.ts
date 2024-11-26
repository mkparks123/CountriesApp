import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { CountryInfoComponent } from './country-info/country-info.component';
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
  {
    path: 'info',
    component: CountryInfoComponent,
    title: 'Country Info',
  },
];
