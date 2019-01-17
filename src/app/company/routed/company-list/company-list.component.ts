import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/company.service';
import { Company } from '../../shared/company.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  constructor(
    private _companyService: CompanyService
  ) { }

  ngOnInit() {
    this._companyService.getAllCompanies().subscribe(companies => this.companies = companies);
  }

  suppress(company: Company) {
    this.companies.splice(this.companies.indexOf(company), 1);
  }

}
