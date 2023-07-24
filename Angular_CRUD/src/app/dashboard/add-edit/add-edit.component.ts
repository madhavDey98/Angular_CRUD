import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BmxToastService } from 'bmx-toast';
import { RequestMapper } from 'src/app/request-mapper';
import { ServiceService } from 'src/app/services/service.service';
import { VariableConstants } from 'src/app/varibale-constants';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  value = 'Clear me';

  constructor(
    private userData: ServiceService,
    private _dialogueRef: MatDialogRef<AddEditComponent>,
    private _toastService: BmxToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  empData = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pnum: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
  });

  getControl(name: any): AbstractControl | null {
    return this.empData.get(name);
  }

  onSubmit() {
    if (this.empData.valid) {
      if (this.data) {
        let inpData = this.empData.value;
        console.log(inpData);
        this.userData.updateEmpDetails(this.data.id, inpData).subscribe({
          next: (result) => {
            console.log(result);
            this._dialogueRef.close(true);

            this._toastService.generate({
              type: 'success', //<-- mandatory key
              toastHeading: 'Success', //<-- mandatory key
              toastText: 'Employer Updated Successfully', //<-- mandatory key
              timeout: 3000, //<-- non-mandatory key
              position: 'top-right', //<-- non-mandatory key
              autoClose: true, //<-- non-mandatory key
              progressbar: true, //<-- non-mandatory key
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        let inpData = this.empData.value;
        console.log(inpData);
        this.userData
          .callApiData(
            inpData,
            VariableConstants.METHOD_POST,
            RequestMapper.API_EMP_LIST,
            VariableConstants.ACCESS_PRIVATE
          )
          .subscribe({
            next: (result) => {
              console.log(result.status);
              if (result.status == 201) {
                this._dialogueRef.close(true);
                this._toastService.generate({
                  type: 'success', //<-- mandatory key
                  toastHeading: 'Success', //<-- mandatory key
                  toastText: 'Employer Added Successfully', //<-- mandatory key
                  timeout: 3000, //<-- non-mandatory key
                  position: 'top-right', //<-- non-mandatory key
                  autoClose: true, //<-- non-mandatory key
                  progressbar: true, //<-- non-mandatory key
                });
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    }
  }

  ngOnInit(): void {
    this.empData.patchValue(this.data);
  }
}
