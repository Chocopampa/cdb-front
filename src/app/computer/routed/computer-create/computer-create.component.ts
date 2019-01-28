import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from '../../shared/computer.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {
  createComputerForm: FormGroup;
  computer: Computer;

  account_validation_messages = {
    computerName: [{ type: 'required', message: 'Company name is required' }]
  };

  constructor(
    private _computerService: ComputerService,
    private _fb: FormBuilder
    ) {}

  ngOnInit() {
    this.computer = new Computer();
    this.createComputerForm = this._fb.group({
      computerName: new FormControl('', Validators.required),
      introduced: new FormControl(''),
      discontinued: new FormControl(''),
      companyId: new FormControl('')
    });
  }

  postComputer() {
    this.computer.name = this.createComputerForm.get('computerName').value;
    this._computerService.createComputer(this.computer).subscribe();
  }
}
