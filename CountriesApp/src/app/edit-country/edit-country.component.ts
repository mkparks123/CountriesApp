import { Component, WritableSignal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Countrylocations } from '../countrylocations';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-country',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './edit-country.component.html',
  styleUrl: './edit-country.component.css',
})
export class EditCountryComponent {
  myCountry = {} as WritableSignal<Countrylocations>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.log('No id provided');
    }

    this.countryService.getCountry(id!);
    this.myCountry = this.countryService.country$;
  }
}
