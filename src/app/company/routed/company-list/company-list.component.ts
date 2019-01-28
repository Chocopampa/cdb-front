import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../shared/company.service';
import { Company } from '../../shared/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/user/shared/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComputerService } from 'src/app/computer/shared/computer.service';
import { Observable } from 'rxjs';

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

  columnsNames: string[] = ['select', 'name', 'computers', 'suppress'];

  companySearchForm: FormGroup;

  companies: Company[];
  compNumber: number[];
  computers_linked: number[];
  dataSource: MatTableDataSource<Company>;
  selection: SelectionModel<Company>;

  order_by: string;
  type_ascend = 'ASC';
  search: string;
  limit: string;
  offset: string;

  nb_companies: number;

  constructor(
    private _fb: FormBuilder,
    private _companyService: CompanyService,
    private _computerService: ComputerService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.order_by = this._route.snapshot.queryParamMap.get('order');
    this.type_ascend = this._route.snapshot.queryParamMap.get('type');
    this.search = this._route.snapshot.queryParamMap.get('search');
    this.limit = this._route.snapshot.queryParamMap.get('limit');
    this.offset = this._route.snapshot.queryParamMap.get('offset');
  }

  ngOnInit() {
    this.loadCompanyList();
    this._companyService.getCompanyCount().subscribe(
      nb => {
        this.nb_companies = nb;
      },
      () => {
        this._userService.logout();
        this._router.navigate(['/login']);
      }
    );
    this.selection = new SelectionModel<Company>(true, []);
    this.companySearchForm = this._fb.group({ name: [''] });
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
      .subscribe(
        companies => {
          this.companies = companies;
          this.dataSource = new MatTableDataSource<Company>(this.companies);
          this.selection.clear();
          this.setPaginatorTotal();
          for (const c of this.companies) {
            this.loadComputerNumber(c.id).subscribe(nb => c.computers_number = nb,
              () => {
                this._userService.logout();
                this._router.navigate(['/login']);
              });
          }
        },
        () => {
          this._userService.logout();
          this._router.navigate(['/login']);
        }
      );
  }

  loadComputerNumber(id: number): Observable<number> {
    return this._computerService
      .getComputerCountFromCompany(id);
  }

  suppress() {
    for (const c of this.selection.selected) {
      this.companies.splice(this.companies.indexOf(c), 1);
      this._companyService.deleteCompany(c.id).subscribe(
        () => {
          this.loadCompanyList();
        },
        () => {
          this._userService.logout();
          this._router.navigate(['/login']);
        }
      );
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
    let limit = +this.limit;
    let offset = +this.offset;
    if (!offset) {
      offset = this.paginator.pageSize;
    }
    if (this.pageEvent.pageIndex) {
      limit = offset * this.paginator._pageIndex;
      this.limit = limit.toString();
    } else {
      if (this.pageEvent.pageSize) {
        offset = this.paginator.pageSize;
        this.limit = '0';
        this.offset = offset.toString();
      }
    }
    this.loadCompanyList();
  }

  searchCompanies() {
    this.search = this.companySearchForm.get('name').value;
    if (this.search === '') {
      this.search = null;
    }
    this.limit = '0';
    this.loadCompanyList();
  }

  setPaginatorTotal() {
    if (!!this.search) {
      this._companyService.getCompanySearchCount(this.search).subscribe(nb => {
        this.nb_companies = nb;
      });
    } else {
      this._companyService.getCompanyCount().subscribe(nb => {
        this.nb_companies = nb;
      });
    }
  }
}
