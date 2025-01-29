import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

// Elements
import { InputComponent } from '../../elements/input/input.component';
import { ButtonComponent } from '../../elements/button/button.component';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage: string | null = null;
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      frmMail: new FormControl('', [Validators.required]),
      frmPwd: new FormControl('', [Validators.required]),
    });
  }
}
