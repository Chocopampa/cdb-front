import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/company.model';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../shared/company.service';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss']
})
export class CompanyUpdateComponent implements OnInit {
  companyForm: FormGroup;
  company: Company;
  id: string;
  error: string;
  mode: boolean;
  errorBody: string;

  constructor(
    private _route: ActivatedRoute,
    private _companyService: CompanyService,
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.mode = false;
    this.company = new Company();
    this.companyForm = this._fb.group({
      companyName: new FormControl('', Validators.required)
    });
    this._companyService.getCompany(this.id).subscribe(
      company => {
        this.company = company;
        this.companyForm.patchValue({ companyName: company.name });
      },
      () => {
        this._userService.logout();
        this._router.navigate(['/login']);
      }
    );
  }

  updateCompany() {
    this.company.name = this.companyForm.get('companyName').value;
    this._companyService.putCompany(this.company, this.id).subscribe(
      () => this._router.navigate(['/companies']),
      err => {
        this.error = err.status;
        this.errorBody = err.error.error;
        this.mode = true;
      }
    );
  }
}
