import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestMapper } from 'src/app/request-mapper';
import { ServiceService } from 'src/app/services/service.service';
import { VariableConstants } from 'src/app/varibale-constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(private userData: ServiceService, private router: Router) {}

  form = new FormGroup({
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
  rightBg() {
    document.body.style.backgroundColor == '#ffe8e8';
  }

  onSubmit() {
    let inpData = this.form.value;
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
        },
      });
  }
}
