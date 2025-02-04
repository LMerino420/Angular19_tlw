import { Directive, Input, output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export type InputSize = 'small' | 'default' | 'large';
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time';

@Directive()
export abstract class InputDirective implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() size: InputSize = 'default';
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() additionalClasses: string = '';
  @Input() type: InputType = 'text';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() isPwd: boolean = false;
  @Input() showPwd: boolean = false;
  valueChange = output<any>();

  onChange: (value: string) => void = () => {};
  onTouch: () => void = () => {};

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.value = obj;
    }
  }

  registerOnChange(fn: (obj: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouch();
    this.valueChange.emit(value);
  }

  getInputClasses(): string {
    const baseClasses =
      'block w-full text-water-900 border rounded-lg bg-water-50 focus:outline-none placeholder:text-[#989C9F]';
    const sizeClasses = {
      small: 'p-2 text-xs',
      default: 'p-2.5 text-sm',
      large: 'p-3 text-base',
    };
    const errorClasses = this.hasError
      ? 'border-error text-error placeholder-red-700 focus:border-error focus:ring-error focus:ring-1 focus:ring-error'
      : 'border-water-900 focus:border-water-500 focus:outline-none focus:ring-1 focus:ring-water-900 focus:border-water-900';

    return `${baseClasses} ${sizeClasses[this.size]} ${errorClasses} ${
      this.additionalClasses
    }`;
  }

  getLabelClasses(): string {
    return this.hasError
      ? 'block mb-2 text-sm font-medium text-red-700'
      : 'block mb-2 text-sm font-medium text-water-900';
  }

  getErrorMessageClasses(): string {
    return 'mt-1 mb-3 text-sm text-red-600';
  }
}
