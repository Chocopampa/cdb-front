import { Component, OnInit, Input } from '@angular/core';
import { Computer } from '../../shared/computer.model';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.scss']
})
export class ComputerDetailComponent implements OnInit {

  @Input()
  computer: Computer;

  constructor() { }

  ngOnInit() {
  }

}
