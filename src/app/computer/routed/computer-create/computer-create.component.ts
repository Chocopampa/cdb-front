import { Component, OnInit, Input } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from '../../shared/computer.model';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Company } from 'src/app/company/shared/company.model';
import { CompanyService } from 'src/app/company/shared/company.service';
import { UserService } from 'src/app/user/shared/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {
  createComputerForm: FormGroup;
  computer: Computer;
  companyList: Company[];
  mode: boolean;
  erreur: string;
  errorBody: string;
  minDate = new Date(1970, 0, 1);
  maxDate = new Date(Date.now());
  minDateDiscontinued: Date;
  discontinuedBool: boolean;
  isIntroDatePicked: boolean;
  isDisconDatePicked: boolean;

  constructor(
    private _computerService: ComputerService,
    private _companyService: CompanyService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.mode = false;
    this.discontinuedBool = false;
    this._companyService.getAllCompany().subscribe(
      companyList => (this.companyList = companyList),
      () => {
        this._userService.logout();
        this._router.navigate(['/login']);
      }
    );
    this.computer = new Computer();
    this.createComputerForm = this._fb.group({
      computerName: new FormControl('', Validators.required),
      introduced: new FormControl({ value: '', disabled: true }),
      discontinued: new FormControl({ value: '', disabled: true }),
      companyId: new FormControl('')
    });
  }

  openSnackBar() {
    this.snackBar.open('OK', null, {
      duration: 1500,
      panelClass: ['snackbar-color']
    });
  }

  clearDatePicker(datePicker: MatInput, datePickerDiscon: MatInput) {
    this.isIntroDatePicked = false;
    this.isDisconDatePicked = false;
    this.discontinuedBool = false;
    datePicker.value = '';
    datePickerDiscon.value = '';
  }
  clearDatePickerDiscon(datePicker: MatInput) {
    this.isDisconDatePicked = false;
    datePicker.value = '';
  }

  enableDiscontinued() {
    this.discontinuedBool = true;
    this.isIntroDatePicked = true;
    this.minDateDiscontinued = this.createComputerForm.get('introduced').value;
  }

  clearDiscon() {
    this.isDisconDatePicked = true;
  }

  postComputer() {
    this.computer.name = this.createComputerForm.get('computerName').value;
    const date_introduced = new Date();
    if (this.isIntroDatePicked) {
      date_introduced.setDate(this.createComputerForm
          .get('introduced')
          .value.getDate());
      this.computer.introduced = (date_introduced as unknown) as string;
    } else {
      this.computer.introduced = null;
    }
    const date_discontinued = new Date();
    if (this.isDisconDatePicked) {
      date_discontinued.setDate(this.createComputerForm
        .get('discontinued')
        .value.getDate());
      this.computer.discontinued = (date_discontinued as unknown) as string;
    } else {
      this.computer.discontinued = null;
    }
    this.computer.companyId = this.createComputerForm.get('companyId').value;
    this._computerService.createComputer(this.computer).subscribe(
      response => {
        this.openSnackBar();
      },
      err => {
        this.erreur = err.status;
        this.errorBody = err.error.error;
        this.mode = true;
      }
    );
  }
}
