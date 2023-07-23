import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequestMapper } from 'src/app/request-mapper';
import { ServiceService } from 'src/app/services/service.service';
import { VariableConstants } from 'src/app/varibale-constants';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
  value = 'Clear me';

  constructor(private userData: ServiceService) {}

  empData = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pnum: new FormControl('', [Validators.required, Validators.maxLength(10)]),
  });

  getControl(name: any): AbstractControl | null {
    return this.empData.get(name);
  }

  onSubmit() {
    let inpData = this.empData.value;
    console.log(inpData);
    this.userData
      .callApi(
        inpData,
        VariableConstants.METHOD_POST,
        RequestMapper.API_CREATE_USER,
        VariableConstants.ACCESS_PRIVATE
      )
      .subscribe({
        next: (result) => {
          console.log(result.status);
          if (result.status == 200) {
            localStorage.setItem('token', result.body.token);
            // this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.log(err.error.error);
        },
      });
  }
}
