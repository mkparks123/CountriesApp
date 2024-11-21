import { Component, OnInit, WritableSignal } from '@angular/core';
import { Countrylocations } from '../countrylocations';
import { CountriesService } from '../countries.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent implements OnInit {
  countries$ = {} as WritableSignal<Countrylocations[]>;
  displayedColumns: string[] = ['col-name', 'col-num', 'col-action'];

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.fetchCountries();
  }

  deleteCountry(id: string): void {
    this.countriesService.deleteCountry(id).subscribe({
      next: () => this.fetchCountries(),
    });
  }

  private fetchCountries(): void {
    this.countries$ = this.countriesService.countries$;
    this.countriesService.getCountries();
  }
}
