import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../shared/company.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  @Input()
  company: Company;

  constructor() {
    console.log(this.company);
  }

  ngOnInit() {
  }

}
