import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-country',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './edit-country.component.html',
  styleUrl: './edit-country.component.css',
})
export class EditCountryComponent {}
