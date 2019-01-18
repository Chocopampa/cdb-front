import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computer } from '../../shared/computer.model';
import { ComputerService } from '../../shared/computer.service';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.scss']
})
export class ComputerDetailComponent implements OnInit {
  @Input()
  computer: Computer;

  @Output()
  delete: EventEmitter<Computer> = new EventEmitter();

  constructor(private _computerService: ComputerService) {}

  ngOnInit() {}

  deleteCompany(id: number) {
    this._computerService
      .deleteComputer(id)
      .subscribe(() => this.delete.emit(this.computer));
  }

  suppress() {
    this.delete.emit(this.computer);
  }
}
