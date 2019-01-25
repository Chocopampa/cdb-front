import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Computer } from '../../shared/computer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-computer-update',
  templateUrl: './computer-update.component.html',
  styleUrls: ['./computer-update.component.scss']
})
export class ComputerUpdateComponent implements OnInit {
  computerForm: FormGroup;

  computer: Computer;

  constructor(
    private _fb: FormBuilder,
    private _computerService: ComputerService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.computerForm = this._fb.group({
      name: [''],
      introduced: [''],
      discontinued: [''],
      id_company: ['']
    });
    this._computerService
      .getComputer(this._route.snapshot.paramMap.get('id'))
      .subscribe(computer => {
        this.computer = computer;
        this.computerForm.patchValue({
          name: computer.name,
          introduced: computer.introduced,
          discontinued: computer.discontinued,
          id_company: computer.companyId
        });
      });
  }

  postChanges() {
    this.computer.name = this.computerForm.get('name').value;
    this.computer.introduced = this.computerForm.get('introduced').value;
    this.computer.discontinued = this.computerForm.get('discontinued').value;
    this.computer.companyId = this.computerForm.get('id_company').value;
    this._computerService.updateComputer(this.computer).subscribe();
  }
}
