import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/company.model';
import { CompanyService } from '../../shared/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

  company: Company;

  constructor(
    private _companyService: CompanyService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._companyService
      .getCompany(this._route.snapshot.paramMap.get('id'))
      .subscribe(company => this.company = company);
  }
}
