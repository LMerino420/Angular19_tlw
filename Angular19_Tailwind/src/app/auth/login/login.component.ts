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

import { Commons } from '../../utils/commons';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage: string | null = null;
  loginForm: FormGroup;

  constructor(private cmm: Commons) {
    this.loginForm = new FormGroup({
      frmMail: new FormControl('', [Validators.required, Validators.email]),
      frmPwd: new FormControl('', [Validators.required]),
    });
  }

  // Iniciar sesión
  login() {
    const dt = this.loginForm.value;
    const params = {
      correo: dt.frmMail,
      clave: dt.frmPwd,
    };
    this.cmm.postReq('Acceso/Login', params).subscribe((rs: any) => {
      console.log('RESULT', rs);
    });
  }

  // Mostrar errres
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control?.errors || !control.touched) return '';

    switch (controlName) {
      case 'frmMail':
        if (control.errors['required']) return 'El email es requerido';
        if (control.errors['email']) return 'El email no es válido';
        break;
      case 'frmPwd':
        if (control.errors['required']) return 'La contraseña es requerida';
        break;
    }

    return '';
  }
}
