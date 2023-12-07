import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-segment-option',
  templateUrl: './segment-option.component.html',
  styleUrls: ['./segment-option.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SegmentOptionComponent implements OnDestroy {
  @Input() type: 'block' | 'line' = 'block';
  @Input() value?: string;
  select = new Subject<string>();
  selectedValue$ = new BehaviorSubject<string>('');
  ngOnDestroy(): void {
    this.select.complete();
    this.selectedValue$.complete();
  }
  getClassMap() {
    return {
      'font-esamanru border-b-2 border-primary text-primary':
        this.type === 'line',
      'border rounded-xl px-5 py-1 font-esamanru': this.type === 'block',
      'bg-blue-500': this.selectedValue$.value === this.value,
      'bg-white': this.selectedValue$.value !== this.value,
    };
  }

  _select() {
    if (this.value) {
      this.select.next(this.value);
    }
  }
}
