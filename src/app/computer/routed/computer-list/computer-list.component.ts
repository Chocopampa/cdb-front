import { Component, OnInit } from '@angular/core';
import { Computer } from '../../shared/computer.model';
import { ComputerService } from '../../shared/computer.service';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  computers: Computer[];

  constructor(
    private _computerService: ComputerService
    ) { }

  ngOnInit() {
    this._computerService.getAllComputers().subscribe(computers => this.computers = computers);
  }

  suppress(computer: Computer) {
    this.computers.splice(this.computers.indexOf(computer), 1);
  }

}
