import { Component } from '@angular/core';
import { EmployeeFormComponent } from './components/input-employee-form/input-employee-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EmployeeFormComponent]
})
export class AppComponent {
  title = 'Calculadora de Salarios';
}