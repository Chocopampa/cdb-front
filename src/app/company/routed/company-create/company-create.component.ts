import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/company.model';
import { CompanyService } from '../../shared/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  createCompanyForm: FormGroup;
  company: Company;

  constructor(
    private _companyService: CompanyService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  account_validation_messages = {
    companyName: [{ type: 'required', message: 'Company name is required' }]
  };

  ngOnInit() {
    this.company = new Company();
    this.createCompanyForm = this._fb.group({
      companyName: new FormControl('', Validators.required)
    });
  }

  postCompany() {
    this.company.name = this.createCompanyForm.get('companyName').value;
    if (!this.company.name) {
      this._snackBar.open('Please give a Company name', '', {
        duration: 2000
      });
    } else {
      this._companyService.postCompany(this.company).subscribe(
        () => {},
        err => {
          if (err.status === 400) {
            this._snackBar.open('This Company already exist and cannot be created', '', {
              duration: 2000
            });
          } else {
            this._snackBar.open(
              'Cannot create a Company, error: ' + err.status, '', {
                duration: 2000
              });
          }
        }
      );
    }
  }
}
