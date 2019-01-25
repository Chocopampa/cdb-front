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

  constructor(
    private _computerService: ComputerService,
    private _companyService: CompanyService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.mode = false;
    this._companyService
      .getCompaniesSpecified(null, null, null, '0', '100')
      .subscribe(companyList => (this.companyList = companyList));
    this.computer = new Computer();
    this.createComputerForm = this._fb.group({
      computerName: new FormControl('', Validators.required),
      introduced: new FormControl({ value: '', disabled: true }),
      discontinued: new FormControl({ value: '', disabled: true }),
      companyId: new FormControl('')
    });
  }

  postComputer() {
    this.computer.name = this.createComputerForm.get('computerName').value;
    this.computer.introduced = this.createComputerForm.get('introduced').value;
    this.computer.discontinued = this.createComputerForm.get(
      'discontinued'
    ).value;
    this.computer.companyId = this.createComputerForm.get('companyId').value;
    this._computerService.createComputer(this.computer).subscribe(
      () => {},
      err => {
        this.erreur = err.status;
        this.mode = true;
      }
    );
  }
}
