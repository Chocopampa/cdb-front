import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CompanyService } from '../../shared/company.service';
import { Company } from '../../shared/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  pageEvent: PageEvent;
  pageSizeOptions: number[] = [10, 50, 100];

  columnsNames: string[] = ['select', 'name', 'suppress'];
  companies: Company[];
  dataSource: MatTableDataSource<Company>;
  selection: SelectionModel<Company>;

  order_by: string;
  type_ascend = 'ASC';
  search: string;
  limit: string;
  offset: string;

  nb_companies: number;

  constructor(
    private _companyService: CompanyService,
    private _route: ActivatedRoute
  ) {
    this.order_by = this._route.snapshot.queryParamMap.get('order');
    this.type_ascend = this._route.snapshot.queryParamMap.get('type');
    this.search = this._route.snapshot.queryParamMap.get('search');
    this.limit = this._route.snapshot.queryParamMap.get('limit');
    this.offset = this._route.snapshot.queryParamMap.get('offset');
  }

  ngOnInit() {
    this.loadCompanyList();
    this._companyService.getCompanyCount().subscribe(nb => {
      this.nb_companies = nb;
    });
    this.selection = new SelectionModel<Company>(true, []);
  }

  loadCompanyList() {
    this._companyService
      .getCompaniesSpecified(
        this.order_by,
        this.type_ascend,
        this.search,
        this.limit,
        this.offset
      )
      .subscribe(companies => {
        this.companies = companies;
        this.dataSource = new MatTableDataSource<Company>(this.companies);
        this.selection.clear();
      });
  }

  suppress() {
    for (const c of this.selection.selected) {
      this.companies.splice(this.companies.indexOf(c), 1);
      this._companyService.deleteCompany(c.id).subscribe(() =>
        this.loadCompanyList());
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  orderBy(order: string) {
    this.triggerAscendingType();
    this.order_by = order;
    this.loadCompanyList();
  }

  triggerAscendingType() {
    if (this.type_ascend === 'ASC') {
      this.type_ascend = 'DESC';
    } else {
      this.type_ascend = 'ASC';
    }
  }

  changePage() {
    let l = +this.limit;
    let o = +this.offset;
    if (this.pageEvent.pageIndex) {
      l = o * this.paginator._pageIndex;
      this.limit = l.toString();
    } else {
      if (this.pageEvent.pageSize) {
        o = this.paginator.pageSize;
        this.limit = '0';
        this.offset = o.toString();
      }
    }
    this.loadCompanyList();
  }
}
