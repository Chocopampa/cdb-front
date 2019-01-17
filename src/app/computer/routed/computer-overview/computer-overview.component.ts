import { Component, OnInit } from '@angular/core';
import { Computer } from '../../shared/computer.model';
import { ComputerService } from '../../shared/computer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-computer-overview',
  templateUrl: './computer-overview.component.html',
  styleUrls: ['./computer-overview.component.scss']
})
export class ComputerOverviewComponent implements OnInit {
  computer: Computer;
  id: string;

  constructor(
    private _route: ActivatedRoute,
    private _computerService: ComputerService
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this._computerService
      .getComputer(this.id)
      .subscribe(computer => (this.computer = computer));
  }
}
