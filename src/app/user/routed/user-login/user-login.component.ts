import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  hide: boolean;
  mode: boolean;


  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
    this.hide = true;
    this.mode = false;
    this.loginForm = this._fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onLogin() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password  = this.loginForm.get('password').value;
    this._userService.login(this.user)
      .subscribe(resp => {
        const jwt = resp.headers.get('authorization');
        this._userService.saveToken(jwt);
        this._router.navigate(['/']);
      }, err => {
        this.mode = true;
      });
  }

}
