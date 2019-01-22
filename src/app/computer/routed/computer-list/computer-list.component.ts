import { Component, OnInit, ViewChild } from '@angular/core';
import { Computer } from '../../shared/computer.model';
import { ComputerService } from '../../shared/computer.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';

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

  columnsNames: string[] = ['select', 'name', 'introduced', 'discontinued', 'company_name', 'suppress'];

  computers: Computer[];
  dataSource: MatTableDataSource<Computer>;
  selection: SelectionModel<Computer>;

  order_by: string;
  type_ascend = 'ASC';
  search: string;
  limit: string;
  offset: string;

  nb_computers: number;

  constructor(
    private _computerService: ComputerService,
    private _route: ActivatedRoute
  ) {
    this.order_by = this._route.snapshot.queryParamMap.get('order');
    this.type_ascend = this._route.snapshot.queryParamMap.get('type');
    this.search = this._route.snapshot.queryParamMap.get('search');
    this.limit = this._route.snapshot.queryParamMap.get('limit');
    this.offset = this._route.snapshot.queryParamMap.get('offset');
  }

  ngOnInit() {
    this.loadComputerList();
    this._computerService.getComputerCount().subscribe(nb => {
      this.nb_computers = nb;
    });
    this.selection = new SelectionModel<Computer>(true, []);
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
      .subscribe(computers => {
        this.computers = computers;
        this.dataSource = new MatTableDataSource<Computer>(this.computers);
        this.selection.clear();
        this._computerService.getComputerCount().subscribe(nb => {
          this.nb_computers = nb;
        });
      });
  }

  suppress(computer: Computer) {
    for (const c of this.selection.selected) {
      this.computers.splice(this.computers.indexOf(c), 1);
      this._computerService
        .deleteComputer(c.id)
        .subscribe(() => this.loadComputerList());
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
    this.loadComputerList();
  }
}
