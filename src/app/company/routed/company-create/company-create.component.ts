import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/company.model';
import { CompanyService } from '../../shared/company.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  createCompanyForm: FormGroup;
  company: Company;
  error: string;
  mode: boolean;
  errorBody: string;

  constructor(
    private _companyService: CompanyService,
    private _fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.mode = false;
    this.company = new Company();
    this.createCompanyForm = this._fb.group({
      companyName: new FormControl('', Validators.required)
    });
  }

  openSnackBar() {
    this.snackBar.open('OK', null, {
      duration: 1500,
      panelClass: ['snackbar-color']
    });
  }

  postCompany() {
    this.company.name = this.createCompanyForm.get('companyName').value;
    this._companyService.postCompany(this.company).subscribe(
      response => {
        this.openSnackBar();
      },
      err => {
        this.error = err.status;
        this.errorBody = err.error.error;
        this.openErrorSnackBar();
      }
    );
  }

  openErrorSnackBar() {
    this.snackBar.open(this.error + this.errorBody, null, {
      duration: 1500,
      panelClass: ['snackbar-error-color']
    });
  }
}
