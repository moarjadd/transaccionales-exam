import { Injectable } from '@angular/core';
import { SalaryCalculationRequest } from '../models/salary-calculation-request.model';
import { SalaryCalculationResponse } from '../models/salary-calculation-response.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryCalculationService {

  calculateSalary(request: SalaryCalculationRequest): SalaryCalculationResponse {
    const regularSalary = request.hoursWorked * request.hourlyWage; // Horas trabajadas * Salario por hora
    const overtimeSalary = request.overtimeHours * request.hourlyWage * 1.5; // Horas extra trabajadas * Salario por hora * 1.5
    const totalSalary = regularSalary + overtimeSalary; // Salario total
    const deductions = totalSalary * 0.1; // Deducciones
    const netSalary = totalSalary - deductions; // Salario Neto

    return {
      regularSalary,
      overtimeSalary,
      deductions,
      netSalary
    };
  }
}