import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from '../../shared/computer.model';

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {
  computer: Computer;

  constructor(private _computerService: ComputerService) {}

  ngOnInit() {
    this.computer = new Computer();
  }

  postComputer() {
    this._computerService.createComputer(this.computer).subscribe();
  }
}
