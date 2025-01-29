import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-button',
  imports: [NgClass, NgIf, SvgIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() color: ColorOptions = 'water';
  @Input() size: 'extra-small' | 'small' | 'base' | 'large' | 'extra-large' =
    'base';
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() additionalClasses: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  private colorClasses: Record<ColorOptions, string> = {
    water:
      'text-neutral-100 bg-water ease-in-out hover:bg-water-700 focus:ring-water-300',
    'water-secondary':
      'text-water-500 bg-water-100 hover:bg-water-200 focus:ring-water-300',
    oasis:
      'text-neutral-100 bg-oasis-500 ease-in-out hover:bg-oasis-700 focus:ring-water-300',
    sun: 'text-neutral-100 bg-yellow-400 ease-in-out hover:bg-yellow-500 focus:ring-yellow-300',
    'water-outline':
      'text-water-900 ease-in-out hover:text-white border border-water-800 hover:bg-water-900 focus:ring-4 focus:outline-none focus:ring-water-300',
    'water-deep':
      'text-neutral-100 bg-water-950 ease-in-out hover:bg-water-900 focus:ring-water-300',
  };

  private sizeClasses: Record<string, string> = {
    'extra-small': 'px-3 py-2 text-xs',
    small: 'px-3 py-2 text-sm',
    base: 'px-5 py-2.5 text-sm',
    large: 'px-5 py-3 text-base',
    'extra-large': 'px-6 py-3.5 text-base',
  };

  private iconSizeClasses: Record<string, string> = {
    'extra-small': 'w-3 h-3',
    small: 'w-3 h-3',
    base: 'w-3.5 h-3.5',
    large: 'w-4 h-4',
    'extra-large': 'w-4 h-4',
  };

  getButtonClasses(): string {
    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
    return `${this.colorClasses[this.color]} ${
      this.sizeClasses[this.size]
    } font-medium text-center rounded-lg focus:ring-4 focus:outline-none inline-flex items-center justify-center ${
      this.additionalClasses
    } ${disabledClass}`;
  }

  getIconClasses(): string {
    const sizeClass = this.iconSizeClasses[this.size];
    const positionClass = this.iconPosition === 'left' ? 'me-2' : 'ms-2';

    const iconColorClasses = {
      water: 'bg-neutral-100 group-hover:bg-neutral-100',
      'water-secondary': 'bg-water-500 group-hover:bg-water-500',
      oasis: 'bg-neutral-100 group-hover:bg-neutral-100',
      sun: 'bg-neutral-100 group-hover:bg-neutral-100',
      'water-outline': 'bg-water-900 group-hover:bg-white',
      'water-deep': 'bg-neutral-100 group-hover:bg-neutral-100',
    };

    return `${sizeClass} ${positionClass} ${iconColorClasses[this.color]}`;
  }
}

type ColorOptions =
  | 'water'
  | 'water-secondary'
  | 'oasis'
  | 'sun'
  | 'water-outline'
  | 'water-deep';
