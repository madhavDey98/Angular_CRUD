import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BmxToastService } from 'bmx-toast';
import { RequestMapper } from 'src/app/request-mapper';
import { ServiceService } from 'src/app/services/service.service';
import { VariableConstants } from 'src/app/varibale-constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private userData: ServiceService,
    private router: Router,
    public _toastService: BmxToastService
  ) {}

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  formSignup = new FormGroup({
    name: new FormControl(),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp') || null;
    const signInButton = document.getElementById('signIn') || null;
    const container = document.getElementById('container') || null;

    if (signUpButton) {
      signUpButton.addEventListener('click', () => {
        if (container) {
          container.classList.add('right-panel-active');
        }
      });
    }

    if (signInButton) {
      signInButton.addEventListener('click', () => {
        if (container) {
          container.classList.remove('right-panel-active');
        }
      });
    }
  }
  getControl(name: any): AbstractControl | null {
    return this.formSignup.get(name);
  }
  getControlLog(name: any): AbstractControl | null {
    return this.formLogin.get(name);
  }

  onSubmit() {
    let inpData = this.formLogin.value;
    this.userData
      .callApi(
        inpData,
        VariableConstants.METHOD_POST,
        RequestMapper.API_LOGIN,
        VariableConstants.ACCESS_PRIVATE
      )
      .subscribe({
        next: (result) => {
          console.log(result.status);
          if (result.status == 200) {
            localStorage.setItem('token', result.body.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.log(err.error.error);
          this._toastService.generate({
            type: 'error', //<-- mandatory key
            toastHeading: 'Error', //<-- mandatory key
            toastText: err.error.error, //<-- mandatory key
            timeout: 3000, //<-- non-mandatory key
            position: 'top-right', //<-- non-mandatory key
            autoClose: true, //<-- non-mandatory key
            progressbar: true, //<-- non-mandatory key
          });
        },
      });
  }

  onSignup() {
    if (this.formSignup.valid) {
      let inpData = this.formSignup.value;
      console.log(inpData);

      this.userData
        .callApi(
          inpData,
          VariableConstants.METHOD_POST,
          RequestMapper.API_REGISTER,
          VariableConstants.ACCESS_PRIVATE
        )
        .subscribe({
          next: (result) => {
            console.log(result.status);
            if (result.status == 200) {
              this._toastService.generate({
                type: 'success', //<-- mandatory key
                toastHeading: 'Registered', //<-- mandatory key
                toastText: 'Please Login to access', //<-- mandatory key
                timeout: 3000, //<-- non-mandatory key
                position: 'top-right', //<-- non-mandatory key
                autoClose: true, //<-- non-mandatory key
                progressbar: true, //<-- non-mandatory key
              });
            }
          },
          error: (err) => {
            console.log(err.error.error);
            this._toastService.generate({
              type: 'error', //<-- mandatory key
              toastHeading: 'Failed', //<-- mandatory key
              toastText: err.error.error, //<-- mandatory key
              timeout: 3000, //<-- non-mandatory key
              position: 'top-right', //<-- non-mandatory key
              autoClose: true, //<-- non-mandatory key
              progressbar: true, //<-- non-mandatory key
            });
          },
        });
    }
  }
}
