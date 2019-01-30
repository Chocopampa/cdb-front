import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  flagToDisplay: string;

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.flagToDisplay = localStorage.getItem('Language');
  }

  logout() {
    this.userService.logout();
  }

  changeLang(lang: string) {
    localStorage.setItem('Language', lang);
    location.reload(true);
  }
}
