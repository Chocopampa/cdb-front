import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Computer } from '../../shared/computer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/company/shared/company.model';
import { CompanyService } from 'src/app/company/shared/company.service';
import { UserService } from 'src/app/user/shared/user.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-computer-update',
  templateUrl: './computer-update.component.html',
  styleUrls: ['./computer-update.component.scss']
})
export class ComputerUpdateComponent implements OnInit {
  computerForm: FormGroup;
  computer: Computer;
  companyList: Company[];
  mode: boolean;
  erreur: string;
  errorBody: string;
  minDate = new Date(1970, 0, 1);
  maxDate = new Date(Date.now());
  minDateDiscontinued: Date;
  discontinuedBool: boolean;
  selected: string;
  isIntroDatePicked: boolean;
  isDisconDatePicked: boolean;

  constructor(
    private _fb: FormBuilder,
    private _computerService: ComputerService,
    private _companyService: CompanyService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mode = false;
    this.computerForm = this._fb.group({
      computerName: new FormControl('', Validators.required),
      introduced: new FormControl({ value: '', disabled: true }),
      discontinued: new FormControl({ value: '', disabled: true }),
      companyId: new FormControl('')
    });
    this._computerService
      .getComputer(this._route.snapshot.paramMap.get('id'))
      .subscribe(computer => {
        this.computer = computer;
        this.computerForm.patchValue({
          computerName: computer.name,
          introduced: new Date(computer.introduced),
          discontinued: new Date(computer.discontinued),
          companyId: computer.companyId
        });
        if (this.computerForm.get('discontinued').value !== null) {
          this.isDisconDatePicked = true;
        }
        if (this.computerForm.get('introduced').value !== null) {
          this.isIntroDatePicked = true;
        }
        if (
          this.computerForm.get('discontinued').value !== null ||
          this.computerForm.get('introduced').value !== null
        ) {
          this.discontinuedBool = true;
        }
        this.minDateDiscontinued = this.computerForm.get('introduced').value;
      });
    this._companyService.getAllCompany().subscribe(
      companyList => (this.companyList = companyList),
      () => {
        this._userService.logout();
        this._router.navigate(['/login']);
      }
    );
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
    this.minDateDiscontinued = this.computerForm.get('introduced').value;
  }

  clearDiscon() {
    this.isDisconDatePicked = true;
  }

  postChanges() {
    this.computer.name = this.computerForm.get('computerName').value;
    const date_introduced = new Date();
    if (this.isIntroDatePicked) {
      date_introduced.setDate(this.computerForm
          .get('introduced')
          .value.getDate());
      this.computer.introduced = (date_introduced as unknown) as string;
    } else {
      this.computer.introduced = null;
    }
    const date_discontinued = new Date();
    if (this.isDisconDatePicked) {
      date_discontinued.setDate(this.computerForm
          .get('discontinued')
          .value.getDate());
      this.computer.discontinued = (date_discontinued as unknown) as string;
    } else {
      this.computer.discontinued = null;
    }
    this.computer.companyId = this.computerForm.get('companyId').value;
    this._computerService.updateComputer(this.computer).subscribe(
      respo   => this._router.navigate(['/computers']),
      err => {
        this.erreur = err.status;
        this.errorBody = err.error.error;
        this.mode = true;
      }
    );
  }
}
