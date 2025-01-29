import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.css',
})
export class SvgIconComponent {
  @HostBinding('style.-webkit-mask-image')
  private maskImage!: string;

  @Input() additionalClasses: string = '';

  @Input()
  set path(value: string) {
    this.maskImage = `url("${value}")`;
  }

  @HostBinding('class')
  get hostClasses(): string {
    return `inline-block h-6 w-6 mask-size-contain mask-position-center mask-no-repeat ${this.additionalClasses}`;
  }
}
