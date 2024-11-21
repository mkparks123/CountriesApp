import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Countrylocations } from '../countrylocations';
import { CountryFormComponent } from '../country-form/country-form.component';
import { CountriesService } from '../countries.service';
@Component({
  selector: 'app-add-country',
  standalone: true,
  imports: [MatCardModule, CountryFormComponent],
  templateUrl: './add-country.component.html',
  styleUrl: './add-country.component.css',
})
export class AddCountryComponent {
  constructor(
    private router: Router,
    private countriesService: CountriesService
  ) {}

  addCountry(country: Countrylocations) {
    this.countriesService.createCountry(country).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create ');
        console.error(error);
      },
    });
    this.countriesService.getCountries();
  }
}
