import { Component, OnInit, ViewChild } from '@angular/core';
import { Computer } from '../../shared/computer.model';
import { ComputerService } from '../../shared/computer.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  pageEvent: PageEvent;
  pageSizeOptions: number[] = [10, 50, 100];

  columnsNames: string[] = [
    'select',
    'name',
    'introduced',
    'discontinued',
    'company_name',
    'suppress'
  ];

  computerSearchForm: FormGroup;

  computers: Computer[];
  dataSource: MatTableDataSource<Computer>;
  selection: SelectionModel<Computer>;

  order_by: string;
  type_ascend = 'ASC';
  search: string;
  limit: string;
  offset: string;
  deleteButtonBool: boolean;

  nb_computers: number;

  constructor(
    private _fb: FormBuilder,
    private _computerService: ComputerService,
    private _route: ActivatedRoute,
    public userService: UserService,
    private _router: Router
  ) {
    this.order_by = this._route.snapshot.queryParamMap.get('order');
    this.type_ascend = this._route.snapshot.queryParamMap.get('type');
    this.search = this._route.snapshot.queryParamMap.get('search');
    this.limit = this._route.snapshot.queryParamMap.get('limit');
    this.offset = this._route.snapshot.queryParamMap.get('offset');
  }

  ngOnInit() {
    this.loadComputerList();
    this._computerService.getComputerCount().subscribe(
      nb => {
        this.nb_computers = nb;
      },
      () => {
        this.userService.logout();
        this._router.navigate(['/login']);
      }
    );
    this.selection = new SelectionModel<Computer>(true, []);
    this.computerSearchForm = this._fb.group({
      name: ['']
    });
    this.deleteButtonBool = false;
  }

  loadComputerList() {
    this._computerService
      .getComputersSpecified(
        this.order_by,
        this.type_ascend,
        this.search,
        this.limit,
        this.offset
      )
      .subscribe(
        computers => {
          this.computers = computers;
          this.dataSource = new MatTableDataSource<Computer>(this.computers);
          this.selection.clear();
          this.setPaginatorTotal();
        },
        () => {
          this.userService.logout();
          this._router.navigate(['/login']);
        }
      );
  }

  suppress() {
    for (const c of this.selection.selected) {
      this.computers.splice(this.computers.indexOf(c), 1);
      this._computerService.deleteComputer(c.id).subscribe(
        () => this.loadComputerList(),
        () => {
          this.userService.logout();
          this._router.navigate(['/login']);
        }
      );
    }
  }

  disabledButton() {
    if (this.selection.selected.length !== 0) {
      this.deleteButtonBool = true;
    } else {
      this.deleteButtonBool = false;
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
    this.loadComputerList();
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
    if (offset === 0) {
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
    this.loadComputerList();
  }

  searchComputers() {
    this.search = this.computerSearchForm.get('name').value;
    if (this.search === '') {
      this.search = null;
    }
    this.limit = '0';
    this.loadComputerList();
  }

  setPaginatorTotal() {
    if (this.search !== null) {
      this._computerService.getComputerSearchCount(this.search).subscribe(
        nb => (this.nb_computers = nb),
        () => {
          this.userService.logout();
          this._router.navigate(['/login']);
        }
      );
    } else {
      this._computerService.getComputerCount().subscribe(
        nb => (this.nb_computers = nb),
        () => {
          this.userService.logout();
          this._router.navigate(['/login']);
        }
      );
    }
  }
}
