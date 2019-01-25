import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/company.model';
import { CompanyService } from '../../shared/company.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  createCompanyForm: FormGroup;
  company: Company;
  erreur: string;
  mode: boolean;

  constructor(
    private _companyService: CompanyService,
    private _fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.mode = false;
    this.company = new Company();
    this.createCompanyForm = this._fb.group({
      companyName: new FormControl('', Validators.required)
    });
  }

  postCompany() {
    this.company.name = this.createCompanyForm.get('companyName').value;
    this._companyService.postCompany(this.company).subscribe(
      () => {},
      err => {
        this.erreur = err.status;
        this.mode = true;
      }
    );
  }
}
