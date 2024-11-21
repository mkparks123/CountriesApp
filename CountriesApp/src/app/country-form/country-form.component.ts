import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Countrylocations } from '../countrylocations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    RouterModule,
  ],

  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.css',
})
export class CountryFormComponent {
  initialState = input<Countrylocations>();

  @Output()
  formValuesChanged = new EventEmitter<Countrylocations>();

  @Output()
  formSubmitted = new EventEmitter<Countrylocations>();
  countryForms = new FormBuilder().nonNullable;
  countryForm = this.countryForms.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    numberOfVisits: [0, [Validators.required, Validators.minLength(1)]],
  });
  constructor() {
    effect(() => {
      this.countryForm.setValue({
        name: this.initialState()?.name || '',
        numberOfVisits: this.initialState()?.numberOfVisits || 0,
      });
    });
  }

  get name() {
    return this.countryForm.get('name')!;
  }

  get numberOfVisits() {
    return this.countryForm.get('numberOfVisits')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.countryForm.value as Countrylocations);
  }
}
