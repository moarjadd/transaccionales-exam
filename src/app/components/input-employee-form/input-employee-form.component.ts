import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SalaryCalculationService } from '../../services/salary-calculation.service';
import { SalaryCalculationResponse } from '../../models/salary-calculation-response.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-employee-form',
  templateUrl: './input-employee-form.component.html',
  styleUrls: ['./input-employee-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class InputEmployeeFormComponent {
  employeeForm: FormGroup;
  salaryResponse: SalaryCalculationResponse | null = null;

  constructor(private fb: FormBuilder, private salaryService: SalaryCalculationService) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      hourlyWage: [0, [Validators.required, Validators.min(0.01)]],
      hoursWorked: [0, [Validators.required, Validators.min(0)]],
      overtimeHours: [0, [Validators.required, Validators.min(0)]]
    }, {
      validators: this.hoursValidator
    });
  }

  hoursValidator(form: FormGroup) {
    const hoursWorked = form.get('hoursWorked')?.value;
    const overtimeHours = form.get('overtimeHours')?.value;
    if (hoursWorked === 0 && overtimeHours === 0) {
      return { hoursInvalid: true };
    }
    return null;
  }

  calculateSalary(): void {
    if (this.employeeForm.valid) {
      const formValues = this.employeeForm.value;
      this.salaryResponse = this.salaryService.calculateSalary(formValues);
    }
  }
}