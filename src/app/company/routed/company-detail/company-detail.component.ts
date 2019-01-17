import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Company } from '../../shared/company.model';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  @Input()
  company: Company;

  @Output()
  delete: EventEmitter<Company> = new EventEmitter();

  constructor(private _companyService: CompanyService) {
  }

  ngOnInit() {
  }

  deleteCompany(id: number) {
    this._companyService
      .deleteCompany(id)
      .subscribe(() => this.delete.emit(this.company));
  }

  suppress() {
    this.delete.emit(this.company);
  }

}
