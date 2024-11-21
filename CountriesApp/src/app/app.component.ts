import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root', //how we can select this component
  standalone: true,

  imports: [RouterOutlet, MatToolbarModule], //other components we are using

  templateUrl: './app.component.html', //our html file for this component
  styleUrl: './app.component.css',
  host: { ngSkipHydration: 'true' },
})
export class AppComponent {}
