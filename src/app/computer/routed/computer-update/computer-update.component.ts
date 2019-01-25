import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Computer } from '../../shared/computer.model';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/company/shared/company.model';
import { CompanyService } from 'src/app/company/shared/company.service';

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

  constructor(
    private _fb: FormBuilder,
    private _computerService: ComputerService,
    private _companyService: CompanyService,
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
        .getCompaniesSpecified(null, null, null, '0', '100')
        .subscribe(companyList => (this.companyList = companyList));
  }

  postChanges() {
    this.computer.name = this.computerForm.get('computerName').value;
    this.computer.introduced = this.computerForm.get('introduced').value;
    this.computer.discontinued = this.computerForm.get('discontinued').value;
    this.computer.companyId = this.computerForm.get('companyId').value;
    this._computerService.updateComputer(this.computer).subscribe(
      () => {},
      err => {
        if (err.status === 400) {
          this.mode = true;
        }
      }
    );
  }
}
