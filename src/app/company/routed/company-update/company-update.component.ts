import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/company.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss']
})
export class CompanyUpdateComponent implements OnInit {
  company: Company;
  id: string;

  companyForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _companyService: CompanyService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.companyForm = this._fb.group({
      name: ['']
    });
    this._companyService
      .getCompany(this.id)
      .subscribe(company => {
        this.company = company;
        this.companyForm.patchValue({
          name: company.name
        });
      });
  }

  updateCompany() {
    this.company.name = this.companyForm.get('name').value;

    this._companyService
      .putCompany(this.company, this.id)
      .subscribe(() => this._router.navigate(['/companies']));
  }

  showCompany() {
    console.log(this.companyForm);
  }


}
