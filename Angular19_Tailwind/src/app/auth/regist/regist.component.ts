import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { Commons } from '../../utils/commons';
// Elements
import { InputComponent } from '../../elements/input/input.component';
import { ButtonComponent } from '../../elements/button/button.component';

@Component({
  selector: 'app-regist',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.css',
})
export class RegistComponent implements OnInit {
  errorMessage: string | null = null;
  registForm: FormGroup;

  constructor(private cmm: Commons) {
    this.registForm = new FormGroup({
      frmName: new FormControl('', [Validators.required]),
      frmMail: new FormControl('', [Validators.required, Validators.email]),
      frmPwd: new FormControl('', [Validators.required]),
      frmPwdConfirm: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.registForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  // Metodo para validad registro
  validRegist() {
    // const infoFrm = this.registForm.value;
    // if (infoFrm.frmPwd !== infoFrm.frmPwdConfirm) {
    //   console.log('Las contraseñas no coinciden');
    //   return;
    // }
    // console.log(infoFrm);
    console.log('TOAST SERVICE');
  }

  // Mostrar errres
  getErrorMessage(controlName: string): string {
    const control = this.registForm.get(controlName);
    if (!control?.errors || !control.touched) return '';

    switch (controlName) {
      case 'frmName':
        if (control.errors['required']) return 'El nombre es requerido';
        break;
      case 'frmMail':
        if (control.errors['required']) return 'El email es requerido';
        if (control.errors['email']) return 'El email no es válido';
        break;
      case 'frmPwd':
        if (control.errors['required']) return 'La contraseña es requerida';
        break;
      case 'frmPwdConfirm':
        if (control.errors['required'])
          return 'La confirmación de contraseña es requerida';
        break;
    }

    return '';
  }
}
