import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-template-for-time-picker',
  templateUrl: './template-for-time-picker.component.html',
  styleUrls: ['./template-for-time-picker.component.scss'],
})
export class TemplateForTimePickerComponent {
  @Input() originOverlay!: CdkOverlayOrigin;
  @Input() cdkConnectedOverlayOpen!: boolean;
  @Input() elemArray!: number[];
  @Input() label: string = '';
  @Input() currentValue: number | undefined;
  @Output() onElemClick = new EventEmitter<number>();
  @Output() onOutsideClick = new EventEmitter<MouseEvent>();
  elemClick(num: number) {
    this.onElemClick.emit(num);
  }
  outsideClick(event: MouseEvent) {
    this.onOutsideClick.emit(event);
  }
  constructor() {}
}
