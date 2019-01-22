import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/myErrorStateMatcher.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  hide = true;
  hideConfirmPassword = true;
  matcher: MyErrorStateMatcher;

  account_validation_messages = {
    username: [{ type: 'required', message: 'Username is required' }],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 8 characters long'
      }
    ]
  };

  constructor(private _userService: UserService, private _fb: FormBuilder) {}

  ngOnInit() {
    this.user = new User();
    this.matcher = new MyErrorStateMatcher();
    this.userForm = this._fb.group(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required])
        )
      },
      { validator: this.checkPasswords }
    );
  }

  postUser() {
    this.user.roleId = '2';
    this.user.username = this.userForm.get('username').value;
    this.user.password = this.userForm.get('password').value;
    this._userService.postUser(this.user).subscribe();
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
