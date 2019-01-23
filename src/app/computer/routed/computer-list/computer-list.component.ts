import { Component, OnInit } from '@angular/core';
import { Computer } from '../../shared/computer.model';
import { ComputerService } from '../../shared/computer.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  computers: Computer[];

  constructor(
    private _computerService: ComputerService,
    private _userService: UserService,
    private _router: Router
    ) { }

  ngOnInit() {
    this._computerService.getAllComputers().subscribe(computers => this.computers = computers,
      () => {
        this._userService.logout();
        this._router.navigate(['/login']);
      });
  }

  suppress(computer: Computer) {
    this.computers.splice(this.computers.indexOf(computer), 1);
  }

}
