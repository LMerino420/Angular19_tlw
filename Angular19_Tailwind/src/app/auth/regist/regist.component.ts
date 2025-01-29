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
  selector: 'app-regist',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.css',
})
export class RegistComponent {
  errorMessage: string | null = null;
  registForm: FormGroup;

  constructor() {
    this.registForm = new FormGroup({
      frmName: new FormControl('', [Validators.required]),
      frmMail: new FormControl('', [Validators.required]),
      frmPwd: new FormControl('', [Validators.required]),
      frmPwdConfirm: new FormControl('', [Validators.required]),
    });
  }
}
