import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/company.model';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  company: Company;

  constructor(private _companyService: CompanyService) { }

  ngOnInit() {
    this.company = new Company();
  }

  postCompany() {
    this.handlePostCompany();
    this._companyService.postCompany(this.company).subscribe();
  }

  handlePostCompany() {
    this.company.id = null;
  }

}
