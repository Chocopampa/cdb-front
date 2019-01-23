import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
  }

}
