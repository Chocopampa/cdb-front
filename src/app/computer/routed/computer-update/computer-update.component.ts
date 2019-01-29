import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Computer } from '../../shared/computer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/company/shared/company.model';
import { CompanyService } from 'src/app/company/shared/company.service';
import { UserService } from 'src/app/user/shared/user.service';

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
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(Date.now());
  discontinuedBool: boolean;

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
          introduced: computer.introduced,
          discontinued: computer.discontinued,
          companyId: computer.companyId
        });
      });
      this._companyService
        .getAllCompany()
        .subscribe(
          companyList => (this.companyList = companyList),
          () => {
            this._userService.logout();
            this._router.navigate(['/login']);
          }
        );
  }

  enableDiscontinued() {
    this.discontinuedBool = true;
    this.minDate = this.computerForm.get('introduced').value;
  }

  postChanges() {
    this.computer.name = this.computerForm.get('computerName').value;
    this.computer.introduced = this.computerForm.get('introduced').value;
    this.computer.discontinued = this.computerForm.get('discontinued').value;
    this.computer.companyId = this.computerForm.get('companyId').value;
    this._computerService
      .updateComputer(this.computer)
      .subscribe(
        () => this._router.navigate(['/computers']),
        err => {
          this.erreur = err.status;
          this.errorBody = err.error.error;
          this.mode = true;
        }
      );
  }
}
