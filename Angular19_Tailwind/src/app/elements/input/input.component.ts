import { Component, forwardRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputDirective } from '../../directives/input.directive';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-input',
  imports: [NgClass, FormsModule, SvgIconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends InputDirective {
  togglePwdVisibility() {
    this.showPwd = !this.showPwd;
  }
}
