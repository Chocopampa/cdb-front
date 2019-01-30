import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

  account_validation_messages = {
    username: [{ type: 'required', message: 'Username is required' }],
    password: [{ type: 'required', message: 'Password is required' }]
  };

  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit() {
    this.user = new User();
    this.hide = true;
    this.mode = false;
    this.loginForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    this._userService.login(this.user).subscribe(
      resp => {
        const jwt = resp.headers.get('authorization');
        this._userService.saveToken(jwt);
        this._router.navigate(['/']);
      },
      () => {
        this.mode = true;
      }
    );
  }
}
