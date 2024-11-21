//all of our compnenets uses this service. Handles all our communication with our api endpoints

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countrylocations } from './countrylocations';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  //this is our server (using localhost right now)
  private url = 'http://localhost:5200';
  //creating a couple signals we can access
  countries$ = signal<Countrylocations[]>([]);
  country$ = signal<Countrylocations>({} as Countrylocations);

  constructor(private httpClient: HttpClient) {}

  //gets all our countries
  private refreshCountries() {
    this.httpClient
      .get<Countrylocations[]>(`${this.url}/countries`)
      .subscribe((countries) => {
        this.countries$.set(countries);
      });
  }

  getCountries() {
    this.refreshCountries();
    return this.countries$();
  }

  //gets single country
  getCountry(id: string) {
    this.httpClient
      .get<Countrylocations>(`${this.url}/countries/${id}`)
      .subscribe((countries) => {
        this.country$.set(countries);
        return this.country$();
      });
  }

  //creating country
  createCountry(country: Countrylocations) {
    return this.httpClient.post(`${this.url}/countries`, country, {
      responseType: 'text',
    });
  }

  //not yet using this
  updateCountry(id: string, country: Countrylocations) {
    return this.httpClient.put(`${this.url}/countries/${id}`, country, {
      responseType: 'text',
    });
  }

  //deleting country
  deleteCountry(id: string) {
    return this.httpClient.delete(`${this.url}/countries/${id}`, {
      responseType: 'text',
    });
  }
}
