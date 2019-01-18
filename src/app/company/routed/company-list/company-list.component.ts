import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/company.service';
import { Company } from '../../shared/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  columnsNames: string[] = ['select', 'name'];
  companies: Company[];
  dataSource: MatTableDataSource<Company>;
  selection: SelectionModel<Company>;

  constructor(private _companyService: CompanyService) {}

  ngOnInit() {
    this._companyService
      .getAllCompanies()
      .subscribe(companies => {
        this.companies = companies;
        this.dataSource = new MatTableDataSource<Company>(this.companies);
      });
    this.selection = new SelectionModel<Company>(true, []);
  }

  suppress(company: Company) {
    this.companies.splice(this.companies.indexOf(company), 1);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
